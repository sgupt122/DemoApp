import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { IDatatableColumn, IUser } from '@/_interfaces';
import { COLUMNS } from '@/_config';
import * as fromAgents from '@/main/agents/store';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-agents-table',
	templateUrl: './agents-table.component.html'
})
export class AgentsTableComponent implements OnChanges, OnInit {
	@Input() public agentsResponse;
	@Input() public selectedAgent;
	@Input() public error;
	@Input() public filters;
	@Input() public agentsColumns: IDatatableColumn[];
	
	@Output() public selectedUpdated = new EventEmitter<IUser | null>();
	@Output() public pageSet = new EventEmitter<{ offset: number }>();
	public loadingIndicator: boolean = true;
	public selected: IUser[] = [];

	constructor(private _store: Store<fromAgents.AgentsState>) { }

	public ngOnInit(): void {

		this.setPage({ offset: this.agentsResponse.meta.pagination.current_page - 1 });
		this._setSelected();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		this.agentsResponse.data.map((res, i) => {
			if (res.email_verified === 1) {
				this.agentsResponse.data[i].email_verified = "Verified"
			} else if (res.email_verified === 0) {
				this.agentsResponse.data[i].email_verified = "Not Verified"
			}
		});
		if (changes.agentsResponse) {
			this.loadingIndicator = false;
		}
		if (changes.selectedAgent) {
			this._setSelected();
		}
		if (this.agentsColumns.length > 0){
			COLUMNS.agents = this.agentsColumns;
		}else {
			this.agentsColumns = COLUMNS.agents;
		}
	}

	public setPage(pageInfo): void {
		this.loadingIndicator = true;
		const filters = { ...this.filters, page: pageInfo.offset + 1 };
		this.pageSet.emit(filters);
	}

	public singleSelectCheck(row: any): boolean {
		return this.selected.indexOf(row) === -1;
	}

	public onSelect(): void {
		if (this.selected.length === 0) {
			return this.selectedUpdated.emit(null);
		}
		this.selectedUpdated.emit(this.selected[0]);
	}

	private _setSelected(): void {
		this.selected = [];
		if (this.selectedAgent && this.selectedAgent.id) {
			this.selected.push(this.selectedAgent);
		}
	}
	public clickOutside(): void {
		return this._store.dispatch(new fromAgents.ClearCurrentAgentID());
	}
}
