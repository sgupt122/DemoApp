import { Component, OnInit, Inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ILeadFilter, ILead } from '@/_interfaces';
import * as fromLeads from '@/main/leads/store';
import { PROSPECTSTATUS } from '@/_config';
import { MAT_DIALOG_DATA } from '@angular/material';
import { leads, commonBtn, commonInfo } from '@/_config/config';
@Component({
	selector: 'app-lead-details',
	templateUrl: './lead-details.component.html',
	styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {
	public currentLeadData: ILead;
	public statuses: any = PROSPECTSTATUS;
	public leadDetailText = {
		commonBtn: commonBtn,
		commonLb: leads.leadDetail,
		name: commonInfo.name,
		campaign: commonInfo.campaign
	}
	constructor(private _store: Store<fromLeads.LeadsState>, @Inject(MAT_DIALOG_DATA) public lead: ILead, ) { }

	ngOnInit(): void {
		/** data from lead table */
		if (Object.keys(this.lead).length === 0) {
			this._store.pipe(select(fromLeads.getCurrentLeadDataById)).subscribe((response) => {
				this.currentLeadData = response[0];
			});
		}
		/** lead data from notification panel */
		else {
			this.currentLeadData = this.lead;
		}
	}
}
