import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalStorage } from 'ngx-webstorage';

import { ILead, IUser } from '@/_interfaces';
import { LeadsService } from '@/_services';
import { commonBtn, leads, commonInfo } from '@/_config/config';

@Component({
	selector: 'app-email-dialog',
	templateUrl: './email-dialog.component.html',
	styleUrls: ['./email-dialog.component.scss'],
	providers: [LeadsService]
})
export class EmailDialogComponent {
	@LocalStorage() public user: IUser;
	public loading: boolean = false;
	public form: { message: string } = {
		message: ''
	};
	public emailConfigTxt = {
		commonBtn: commonBtn,
		commonLb: leads.emailDialogForm,
		name: commonInfo.name,
		message: leads.message,
		number: leads.number,
		email: commonInfo.commonFormLabels.email
	};
	constructor(
		public dialogRef: MatDialogRef<EmailDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public lead: ILead,
		private _leadsService: LeadsService
	) { }

	public email(formData: { message: string }): void {
		this.loading = true;
		this._leadsService
			.emailLead({ agent: this.user.profile.phone, lead: this.lead.email, message: formData.message })
			.subscribe(response => {
				setTimeout(() => {
					this.loading = false;
					this.dialogRef.close();
				}, 1000);
			});
	}
}
