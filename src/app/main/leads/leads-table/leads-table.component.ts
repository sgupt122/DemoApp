import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { IApiSuccess, IClientDisposition, IDatatableColumn, ILead, ILeadFilter } from '@/_interfaces';
import { COLUMNS, PROSPECTSTATUS } from '@/_config';
import { NavigationService } from '@/_services';


@Component({
	selector: 'app-leads-table',
	templateUrl: './leads-table.component.html',
	styleUrls: ['./leads-table.component.scss']
})
export class LeadsTableComponent implements OnChanges, OnInit {
	@Input() public leadsResponse: IApiSuccess<ILead[]>;
	@Input() public selectedLead: ILead;
	@Input() public leadFilters: ILeadFilter;
	@Input() public clientDispositions: IClientDisposition[];
	@Input() public leadsColumns;

	@Output() public selectedUpdated = new EventEmitter<ILead | null>();
	@Output() public pageSet = new EventEmitter<{ offset: number }>();
	@Output() public updateResults = new EventEmitter<ILeadFilter>();
	@Output() public deselectRow = new EventEmitter();

	public loadingIndicator: boolean = true;
	public selected: ILead[] = [];
	public statuses: any = PROSPECTSTATUS;
	public isLeadsActionShow: boolean;
	public isActionArray;


	constructor(
		private navigationService: NavigationService
	) { }

	public ngOnInit(): void {
		this.setPage({ offset: this.leadsResponse.meta.pagination.current_page - 1 });
		this._setSelected();
		this.navigationService.getSingleNavigation().subscribe(obj => {
			this.isLeadsActionShow = obj["data"][0]["navigation"]["leads-action"].isAction;
			this.isActionArray = obj["data"][0]["navigation"]["leads-action"].options
		})
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.leadsResponse) {
			this.loadingIndicator = false;
		}
		if (changes.selectedLead) {
			this._setSelected();
		}
		if (this.leadsColumns.length > 0) {
			COLUMNS.leads = this.leadsColumns;
		} else {
			this.leadsColumns = COLUMNS.leads;
		}
	}

	public setPage(pageInfo): void {
		this.loadingIndicator = true;
		this.leadFilters.page = pageInfo.offset + 1;
		this.pageSet.emit(this.leadFilters);
	}

	public singleSelectCheck(row: any): boolean {
		return this.selected.indexOf(row) === -1;
	}

	public onSelect(): void {
		if (this.selected.length === 0) {
			return this.selectedUpdated.emit(null);
		}
		this.selectedUpdated.emit(this.selected[0]);
		this.deselectRow.emit(false);
	}

	public updateDisposition(filters: ILeadFilter): void {
		this.updateResults.emit(filters);
	}

	private _setSelected(): void {
		this.selected = [];
		if (this.selectedLead && this.selectedLead.id) {
			this.selected.push(this.selectedLead);
		}
	}
	public clickOutside(): void {
		this.selected = [];
		this.deselectRow.emit(true);
	}
}
