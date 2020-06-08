import { Component, Inject, ChangeDetectorRef, AfterContentChecked, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LocalStorage } from 'ngx-webstorage';
import { IClientDisposition, ILead, IUser } from '@/_interfaces';
import { LeadsService } from '@/_services';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { commonBtn, dispostionForm, commonInfo } from '@/_config/config';


@Component({
	selector: 'app-disposition-dialog',
	templateUrl: './disposition-dialog.component.html',
	styleUrls: ['./disposition-dialog.component.scss'],
	providers: [LeadsService]
})
export class DispositionDialogComponent implements AfterContentChecked, OnInit {
	@LocalStorage() public user: IUser;
	@LocalStorage() private impersonateToken: string;
	public loading: boolean = false;
	public currentDate = new Date();
	public endDate = new Date();
	public form = new FormGroup({
		client_disposition_id: new FormControl(),
		start_date_time: new FormControl(new Date()),
		end_date_time: new FormControl(new Date(this.currentDate.getTime() + (30 * 60 * 1000))),
		title: new FormControl(),
		notes: new FormControl(),
		location: new FormControl()
	});
	public dispostionConfigTxt = {
		commonBtn: commonBtn,
		commonLb: dispostionForm,
		name: commonInfo.name
	}
	ngOnInit(): void {
		this.disabledBtn();
	}

	constructor(
		public dialogRef: MatDialogRef<DispositionDialogComponent>,
		private cdr: ChangeDetectorRef,
		@Inject(MAT_DIALOG_DATA) public data: { lead: ILead; clientDispositions: IClientDisposition[] },
		private _leadsService: LeadsService
	) {
		this.form.controls.location.setValue(data.lead.location);
		this.form.controls.title.setValue(data.lead.title);
		this.form.controls.notes.setValue(data.lead.notes);
		this.endDate = new Date(new Date(this.form.controls.start_date_time.value).setMinutes((this.form.controls.start_date_time.value.getMinutes() + 30)));
		this.form.controls.client_disposition_id.setValue(data.lead.client_disposition_id);
		if (data.lead.start_date_time === null && data.lead.end_date_time === null) {
			this.form.controls.start_date_time.setValue(new Date());
			this.form.controls.end_date_time.setValue(new Date(this.form.controls.start_date_time.value.getTime() + (30 * 60 * 1000)));
		}
		else {
			this.form.controls.start_date_time.setValue(new Date(data.lead.start_date_time));
			this.form.controls.end_date_time.setValue(new Date(data.lead.end_date_time));
		}
	}

	ngAfterContentChecked(): void {
		this.cdr.detectChanges();
	}
	onChange(): void {
		this.endDate = new Date(new Date(this.form.controls.start_date_time.value).setMinutes((this.form.controls.start_date_time.value.getMinutes() + 30)));
	}
	public disposition(): void {
		this.loading = true;
		let dispositionObj;
		if (this.form.controls.client_disposition_id.value === 2) {
			dispositionObj = {
				lead_id: this.data.lead.id,
				agent_id: this.user.id,
				client_disposition_id: this.form.controls.client_disposition_id.value,
				start_date_time: this.form.controls.start_date_time.value,
				end_date_time: this.form.controls.end_date_time.value,
				location: this.form.controls.location.value,
				title: this.form.controls.title.value,
				notes: this.form.controls.notes.value,
				impersonateToken: this.impersonateToken
			}
			this._leadsService
				.dispositionLead(dispositionObj)
				.subscribe(() => {
					setTimeout(() => {
						this.loading = false;
						this.dialogRef.close(true);
					}, 200);
				});
		}
		else {
			dispositionObj = {
				lead_id: this.data.lead.id,
				agent_id: this.user.id,
				client_disposition_id: this.form.controls.client_disposition_id.value,
				impersonateToken: this.impersonateToken
			}
			this._leadsService
				.dispositionLead(dispositionObj)
				.subscribe(() => {
					setTimeout(() => {
						this.loading = false;
						this.dialogRef.close(true);
					}, 200);
				});
		}
		this.form.reset();
	}
	public disabledBtn(): void {
		if (this.form.controls.client_disposition_id.value === 0) {
			this.form.get('client_disposition_id').setValue('');
			this.form.get('client_disposition_id').setValidators(Validators.required);
		}
		else if (this.form.controls.client_disposition_id.value !== 2) {
			this.form.get('title').clearValidators();
			this.form.get('notes').clearValidators();
			this.form.get('location').clearValidators();
			this.form.get('start_date_time').clearValidators();
			this.form.get('end_date_time').clearValidators();

			this.form.get('title').updateValueAndValidity();
			this.form.get('notes').updateValueAndValidity();
			this.form.get('location').updateValueAndValidity();
			this.form.get('start_date_time').updateValueAndValidity();
			this.form.get('end_date_time').updateValueAndValidity();
		}
		else {
			this.form.get('title').setValidators(Validators.required);
			this.form.get('notes').setValidators(Validators.required);
			this.form.get('location').setValidators(Validators.required);
			this.form.get('start_date_time').setValidators(Validators.required);
			this.form.get('end_date_time').setValidators(Validators.required);

			this.form.get('title').updateValueAndValidity();
			this.form.get('notes').updateValueAndValidity();
			this.form.get('location').updateValueAndValidity();
			this.form.get('start_date_time').updateValueAndValidity();
			this.form.get('end_date_time').updateValueAndValidity();

		}
	}
}
