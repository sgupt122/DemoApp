import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { LocalStorage } from 'ngx-webstorage';

import { IApiSuccess, IOrderDistributionType, IUser, IOrderDistribution, IOrder } from '@/_interfaces';
import { order, commonBtn } from '@/_config/config';

@Component({
	selector: 'app-distributions',
	templateUrl: './distributions.component.html',
	styleUrls: ['./distributions.component.scss']
})
export class DistributionsComponent implements OnChanges, OnInit {
	@LocalStorage() public user: IUser;
	@Input() public distributionFormGroup: FormGroup;
	@Input() public distributionTypes: IApiSuccess<IOrderDistributionType[]>;
	@Input() public order: IOrder;
	@Input() private isEditMode: boolean;
	public distributions: Array<IOrderDistribution[]> = [];
	public selectedRecipient: any = {};
	public recipientEmail: string = '';
	public recipientSMS: string = '';
	public orderAddConfig = {
		commonBtn: commonBtn,
		commonLb: order.orderDistributionAdd
	}
	constructor(private _formBuilder: FormBuilder, ) { }

	public ngOnInit(): void {
		if (this.distributionFormGroup.value.length > 0) {
			this.distributionFormGroup.value.value.forEach(distribution => {
				if (!this.selectedRecipient[distribution.order_distribution_type_id]) {
					this.selectedRecipient[distribution.order_distribution_type_id] = '';
				}
				this.selectedRecipient[distribution.order_distribution_type_id] = distribution.recipient;
			});
		}
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.distributionTypes && !changes.distributionTypes.firstChange) {
			this.distributionTypes.data.forEach(distribution => {
				if (!this.isEditMode) {
					if (!this.distributions[distribution.id]) {
						this.distributions[distribution.id] = [];
					}
					if (distribution.name.includes('Email')) {
						this.distributions[distribution.id].push({ order_distribution_type_id: distribution.id, recipient: this.user.email });
					}
					if (distribution.name.includes('SMS')) {
						this.distributions[(distribution.id)].push({ order_distribution_type_id: distribution.id, recipient: this.user.profile.phone });
					}
				}
				if (this.isEditMode) {
					if (!this.distributions[distribution.id]) {
						this.distributions[distribution.id] = [];
					}
					this.order.distributions.map(elem => {
						if (elem.order_distribution_type_id === 1 && distribution.name.includes('Email')) {
							this.selectedRecipient[elem.order_distribution_type_id] = elem.recipient;
							this.recipientEmail = this.selectedRecipient[elem.order_distribution_type_id];
							this.distributions[distribution.id].push({ order_distribution_type_id: elem.order_distribution_type_id, recipient: elem.recipient });
						}
						if (elem.order_distribution_type_id === 2 && distribution.name.includes('SMS')) {
							this.selectedRecipient[elem.order_distribution_type_id] = elem.recipient;
							this.recipientSMS = this.selectedRecipient[elem.order_distribution_type_id];
							this.distributions[(distribution.id)].push({ order_distribution_type_id: elem.order_distribution_type_id, recipient: elem.recipient });
						}
					});
				}
			});
		}
	}
	/** on selecting recipient */
	public onRecipientSelect(distribution: IOrderDistribution): void {
		const distributions = this.distributionFormGroup.controls.data as FormArray;
		distributions.push(this._formBuilder.group({ order_distribution_type_id: distribution.order_distribution_type_id, recipient: distribution.recipient }));
	}

	public addData(): void {
		if (this.distributions.length > 0) {
			this.recipientEmail = this.distributions[1][0].recipient;
			this.recipientSMS = this.distributions[2][0].recipient;
			const distribution = [];
			distribution.push(this.distributions[1][0], this.distributions[2][0]);
			distribution.map(dis => {
				const distributions = this.distributionFormGroup.controls.data as FormArray;
				distributions.push(this._formBuilder.group({ order_distribution_type_id: dis.order_distribution_type_id, recipient: dis.recipient }));
			});
		}
	}
}
