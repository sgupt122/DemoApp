import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { ILead, IDisputeReason, IDisputeLead } from '@/_interfaces';
import * as fromLeads from '@/main/leads/store';
import { PROSPECTSTATUS } from '@/_config';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { LocalStorage } from 'ngx-webstorage';
import { leads, commonBtn } from '@/_config/config';

@Component({
	selector: 'app-lead-credit',
	templateUrl: './lead-credit.component.html',
	styleUrls: ['./lead-credit.component.scss']
})
export class LeadCreditComponent implements OnInit {
	@LocalStorage() impersonateToken: string;
	public currentLeadData: ILead;
	public statuses: any = PROSPECTSTATUS;
	public disputeReasons$: Observable<IDisputeReason[]>;
	public disputeLeadFG = new FormGroup({
		lead_id: new FormControl(),
		user_id: new FormControl(),
		reasonId: new FormControl(),
		leadIssue: new FormControl()
	});
	private currentDisputeLeadData: IDisputeLead;
	public leadCreditText = {
		commonBtn: commonBtn,
		commonLb: leads.leadCredit
	}

	constructor(private _store: Store<fromLeads.LeadsState>,
		public dialogRef: MatDialogRef<LeadCreditComponent>,
		private shared: SharedFunctions) { }

	ngOnInit(): void {
		this._store.pipe(select(fromLeads.getCurrentLeadDataById)).subscribe((response) => {
			this.currentLeadData = response[0];
		});
		this._store.dispatch(new fromLeads.GetCurrentDisputeLead(this.currentLeadData));
		this._store.dispatch(new fromLeads.LoadDisputeReason());
		this.disputeReasons$ = this._store.pipe(select(fromLeads.getDisputeReasons));

		this._store.pipe(select(fromLeads.getCurrentDisputeLead)).subscribe(res => {
			if (res.reasonId && res.lead_id) {
				this.currentDisputeLeadData = res;
				this.disputeLeadFG.controls['leadIssue'].setValue(res.leadIssue);
				this.disputeLeadFG.controls['reasonId'].setValue(res.reasonId.toString());
				this.disputeLeadFG.controls['lead_id'].setValue(res.lead_id);
			} else {
				this.disputeLeadFG.reset();
			}
		});
	}

	public saveDisputeLead(): void {
		this.disputeLeadFG.controls.lead_id.setValue(this.currentLeadData.id);
		this.disputeLeadFG.controls.user_id.setValue(this.currentLeadData.user.id);
		const disputeObj = { ...this.disputeLeadFG.value, impersonateToken: this.impersonateToken }
		this._store.dispatch(new fromLeads.CreateDisputeLead(disputeObj));
		this.disputeLeadFG.reset();
		this.shared._snackbarMessage(this.leadCreditText.commonLb.leadSaveMsg, 1500);
		this.dialogRef.close(true);
	}
}
