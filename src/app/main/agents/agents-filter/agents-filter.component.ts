import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { IUserFilter } from '@/_interfaces';
import { commonBtn, commonInfo, agents } from '@/_config/config';

@Component({
	selector: 'app-agents-filter',
	templateUrl: './agents-filter.component.html',
	styleUrls: ['./agents-filter.component.scss']
})
export class AgentsFilterComponent {
	@Input() public filters;
	@Output() public formResetClicked = new EventEmitter<boolean>();
	@Output() public filterButtonClicked = new EventEmitter<IUserFilter>();
	public agentConfigTxt = {
		commonbtn: commonBtn,
		commoninfo: commonInfo.commonFormLabels,
		agentFilter: agents.agentFilter
	}
	constructor() { }

	public resetForm(form: NgForm): void {
		const filters = { ...form.value, page: 1 };
		this.formResetClicked.emit(true);
		this.filterButtonClicked.emit(filters);
	}

	public filter(form: NgForm): void {
		const filters = { ...form.value, page: 1 };
		this._replaceNullValues(filters);
		this.filterButtonClicked.emit(filters);
		this.formResetClicked.emit(true);
	}

	private _replaceNullValues(filters: IUserFilter): void {
		Object.keys(filters).forEach(filter => {
			if (!filters[filter]) {
				filters[filter] = '';
			}
		});
	}
}
