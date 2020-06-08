import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IUser } from '@/_interfaces';
import { STATES, TIMEZONES } from '@/_config';
import * as fromAgent from '@/main/agents/store';
import { SharedFunctions } from '@/shared/sharedFunctions';

@Component({
	selector: 'app-agents-form-shell',
	templateUrl: './agents-form-shell.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgentsFormShellComponent implements OnInit {
	public agent$: Observable<IUser>;
	public action: string;
	public states = STATES;
	public timezones = TIMEZONES;

	constructor(
		private _store: Store<fromAgent.AgentsState>,
		private _titleService: Title,
		private _route: ActivatedRoute,
		private shared: SharedFunctions
	) { }

	public ngOnInit(): void {
		this._titleService.setTitle(`Agents Form - Charcoal`);
		this.agent$ = this._store.pipe(select(fromAgent.getCurrentAgent));
		this._route.params.subscribe((params: { action: string }) => {
			this.action = params.action;
		});
	}

	public create(agent: IUser): void {
		this._store.dispatch(new fromAgent.CreateAgent(agent));
		const error$ = this._store.pipe(select(fromAgent.getError));
		error$.subscribe(res => {
			if (res) {
				this.shared._snackbarMessage(res, 1000);
			}
		});
	}

	public update(agent: IUser): void {
		this._store.dispatch(new fromAgent.UpdateAgent(agent));
	}
}
