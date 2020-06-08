import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalStorage } from 'ngx-webstorage';

import { ILead, IUser } from '@/_interfaces';
import { LeadsService } from '@/_services';
import { commonBtn, leads, commonInfo } from '@/_config/config';

@Component({
	selector: 'app-call-dialog',
	templateUrl: './call-dialog.component.html',
	styleUrls: ['./call-dialog.component.scss'],
	providers: [LeadsService]
})
export class CallDialogComponent {
	@LocalStorage() public user: IUser;
	public loading: boolean = false;
	public callConfigTxt = {
		commonBtn: commonBtn,
		commonLb: leads.callDialogForm,
		name: commonInfo.name,
		number: leads.number
	};
	constructor(
		public dialogRef: MatDialogRef<CallDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public lead: ILead,
		private _leadsService: LeadsService
	) { }

	public call(): void {
		this.loading = true;
		this._leadsService.callLead({ agent: this.user.profile.phone, lead: this.lead.phone }).subscribe(response => {
			setTimeout(() => {
				this.loading = false;
				this.dialogRef.close();
			}, 2000);
		});
	}
}
