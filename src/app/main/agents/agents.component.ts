import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { IApiSuccess, IUser, IUserFilter, IDatatableColumn } from '@/_interfaces';
import { AuthenticationService, AgentsService } from '@/_services';
import * as fromAgents from '@/main/agents/store';
import { Router } from '@angular/router';
import { commonBtn, agents } from '@/_config/config'
import { AgentsColumnComponent } from './agents-column/agents-column.component';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { COLUMNS } from '@/_config';

@Component({
	selector: 'app-agents',
	templateUrl: './agents.component.html',
	styleUrls: ['./agents.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: fuseAnimations
})
export class AgentsComponent implements OnInit {
	public agentsResponse$: Observable<IApiSuccess<IUser[]>>;
	public error$: Observable<string>;
	public selectedAgent$: Observable<IUser>;
	public filters$: Observable<IUserFilter>;
	public agentsColumns$: Observable<IDatatableColumn[]>;
	public isAdmin: boolean = false;
	private currentAgent: IUser;
	public isAgentSelected: boolean = true;
	public agentConfigTxt = {
		commonbtn: commonBtn,
		agents: agents
	}
	public isSaveBtnDisabled: boolean;
	public copyAgentColumn: any;
	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Title} _titleService
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {FuseSidebarService} _fuseSidebarService
	 * @param {AuthenticationService} _authService
	 */
	constructor(
		private _store: Store<fromAgents.AgentsState>,
		private _titleService: Title,
		private _fuseConfigService: FuseConfigService,
		private _fuseSidebarService: FuseSidebarService,
		private _authService: AuthenticationService,
		private _agentService: AgentsService,
		private router: Router,
		private shared: SharedFunctions
	) { }

	public ngOnInit(): void {
		this._titleService.setTitle(`Agents - Charcoal`);
		this.isAdmin = this._authService.isAdmin();
		this.agentsResponse$ = this._store.pipe(select(fromAgents.getAgents));
		this.selectedAgent$ = this._store.pipe(select(fromAgents.getCurrentAgent));
		this.filters$ = this._store.pipe(select(fromAgents.getAgentFilters));
		this.error$ = this._store.pipe(select(fromAgents.getError));

		this._store.dispatch(new fromAgents.LoadColumns());
		this.agentsColumns$ = this._store.pipe(select(fromAgents.getAgentColumns));

		this.agentsColumns$.subscribe(res => {
			this.copyAgentColumn = JSON.parse(JSON.stringify(res));
		});
		this.isSaveBtnDisabled = true;

		this.selectedAgent$.subscribe(agent => {
			if (agent) {
				this.isAgentSelected = false;
				this.currentAgent = agent;
			} else {
				this.isAgentSelected = true;
			}
		});
	}

	public setPage(filters: IUserFilter): void {
		this._store.dispatch(new fromAgents.SetAgentFilters(filters));
		this._store.dispatch(new fromAgents.LoadAgents(filters));
	}

	public newAgent(): void {
		this._store.dispatch(new fromAgents.InitializeCurrentAgentID());
	}

	public updateSelectedAgent(user: IUser | null): void {
		if (!user) {
			this.isAgentSelected = true;
			return this._store.dispatch(new fromAgents.ClearCurrentAgentID());
		}
		this.isAgentSelected = false;
		this._store.dispatch(new fromAgents.SetCurrentAgentID(user));
	}

	public toggleSidebarOpen(key): void {
		this._fuseSidebarService.getSidebar(key).toggleOpen();
	}

	public setFilters(filters: IUserFilter): void {
		this._store.dispatch(new fromAgents.SetAgentFilters(filters));
		this._store.dispatch(new fromAgents.LoadAgents(filters));
		this.toggleSidebarOpen('agentsFilter');
	}

	public formReset(): void {
		this._store.dispatch(new fromAgents.ResetAgentFilters());
	}

	public addImpersonateAgent(): void {
		this._agentService.addImpersonateAgent(this.currentAgent).subscribe(res => {
			const token: string = res['data']['token'];
			this._authService.setToken(token);
			this._authService.setUser().subscribe();
			this.router.navigateByUrl('/dashboard');
			const adminName: string = res['message'];
			this._authService.setData('admin', adminName);
			const impersonateMsg = adminName + ' is logged in as ' + this.currentAgent.profile.first_name + ' ' + this.currentAgent.profile.last_name;
			this._authService.setData('impersonateMsg', impersonateMsg);
			const impersonateToken = res['data']['impersonateToken'];
			this._authService.setData('impersonateToken', impersonateToken);
		})
	}

	public changeColumnName(): void{
		this.shared.modalPopup(AgentsColumnComponent, '600px', '');
	}

	public changeColumnFlag(checked, i): void {
		this.isSaveBtnDisabled = false;
		this.copyAgentColumn[i].flag = checked ? true : false;
	}

	public saveColumnHideShow(): void {
		COLUMNS.agents = [...this.copyAgentColumn];
		this._store.dispatch(new fromAgents.UpdateColumns(COLUMNS.agents));
		this.toggleSidebarOpen('agentColumns');
	}
}
