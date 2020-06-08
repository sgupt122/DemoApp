import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalStorage } from 'ngx-webstorage';

import { ILead, IUser } from '@/_interfaces';
import { LeadsService } from '@/_services';
import { commonBtn, leads, commonInfo } from '@/_config/config';

@Component({
	selector: 'app-text-dialog',
	templateUrl: './text-dialog.component.html',
	styleUrls: ['./text-dialog.component.scss'],
	providers: [LeadsService]
})
export class TextDialogComponent {
	@LocalStorage() public user: IUser;
	public loading: boolean = false;
	public form: { message: string } = {
		message: ''
	};
	public textConfigTxt = {
		commonBtn: commonBtn,
		commonLb: leads.textDialogForm,
		name: commonInfo.name,
		number: leads.number,
		message: leads.message
	};

	constructor(
		public dialogRef: MatDialogRef<TextDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public lead: ILead,
		private _leadsService: LeadsService
	) { }

	public text(formData: { message: string }): void {
		this.loading = true;
		this._leadsService
			.textLead({ agent: this.user.profile.phone, lead: this.lead.phone, message: formData.message })
			.subscribe(response => {
				setTimeout(() => {
					this.loading = false;
					this.dialogRef.close();
				}, 1000);
			});
	}
}
