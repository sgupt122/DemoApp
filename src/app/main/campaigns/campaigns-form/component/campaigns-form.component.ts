import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { ICampaign, ILeadType, IProvider } from '@/_interfaces';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { commonBtn, campaign, commonInfo } from '@/_config/config';

@Component({
	selector: 'app-campaigns-form',
	templateUrl: './campaigns-form.component.html',
	styleUrls: ['./campaigns-form.component.scss'],
	animations: fuseAnimations
})
export class CampaignsFormComponent implements OnInit {
	@Input() public action: string;
	@Input() public campaign: ICampaign;
	@Input() public providers: IProvider[];
	@Input() public leadTypes: ILeadType[];
	@Output() public create = new EventEmitter<ICampaign>();
	@Output() public update = new EventEmitter<ICampaign>();
	public form: FormGroup;
	public campaignFormConfig = {
		commonBtn: commonBtn,
		campaigns: campaign.campaigns,
		campaignFG: campaign.campaignForm,
		campaign: commonInfo.campaign
	}
	/**
	 * Constructor
	 *
	 * @param {FormBuilder} _formBuilder
	 * @param {Router} _router
	 */
	constructor(private shared: SharedFunctions, private _formBuilder: FormBuilder, private _router: Router) { }

	public ngOnInit(): Promise<boolean> {
		if (!this.campaign) {
			return this._router.navigate(['/campaigns']);
		}
		this.form = this._createForm();
	}

	public saveCampaign(campaign: ICampaign): void {
		this.shared._snackbarMessage('Campaign saved!', 1000)
			.afterDismissed()
			.subscribe(() => {
				this._router.navigate(['/campaigns']);
			});
		if (campaign.id) {
			return this.update.emit(campaign);
		}
		this.create.emit(campaign);
	}

	private _createForm(): FormGroup {
		return this._formBuilder.group({
			id: [this.campaign.id || null],
			provider_id: [this.campaign.provider_id || '', Validators.required],
			lead_type_id: [this.campaign.lead_type_id || '', Validators.required],
			billing_code: [this.campaign.billing_code || ''],
			activated_date: [this.campaign.activated_date || ''],
			active: [this.campaign.active || 0, Validators.required]
		});
	}
}
