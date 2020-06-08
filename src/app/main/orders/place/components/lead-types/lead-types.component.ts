import { Component, Input, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';

import { IApiError, IApiSuccess, ICampaign, ILeadType, IOrder, IOrderLeadType, IOrderProvider } from '@/_interfaces';
import { OrdersService } from '@/_services';
import { OrderFakeData } from '@/_models/order-fake-data';
import { commonBtn, commonInfo, order } from '@/_config/config';
import { LocalStorage } from 'ngx-webstorage';

interface ILeadTypes {
	lead_type_id: number;
	lead_type_name: string;
}
@Component({
	selector: 'app-lead-types',
	templateUrl: './lead-types.component.html',
	styleUrls: ['./lead-types.component.scss'],
	providers: [OrdersService]
})
export class LeadTypesComponent implements OnInit {
	@LocalStorage() user;
	@Output() leadTypesOrder = new EventEmitter();
	@Input() public leadTypesFormGroup: FormGroup;
	@Input() public leadTypes: IApiSuccess<ILeadType[]> | IApiError;
	@Input() private order: IOrder;
	@Input() private isEditMode: boolean;
	public types = new FormControl();
	private providers: IOrderProvider[];
	public campaigns: ICampaign[];
	public loading: boolean = false;
	public leadTypeInfo: IOrderLeadType[];
	public providerValue: boolean = true;
	private leadType: ILeadTypes[] = [];
	public fakeData: any;
	public orderAddInfo = {
		commonBtn: commonBtn,
		commonInfo: commonInfo.commonFormLabels,
		commonLb: order.orderLeadAdd
	}
	constructor(
		private _formBuilder: FormBuilder,
		private _cd: ChangeDetectorRef,
		private _ordersService: OrdersService
	) { }

	public async ngOnInit(): Promise<void> {
		this.fakeData = OrderFakeData.leadType;
		if (this.order) {
			if (this.order.lead_types.length > 0) {
				const leadTypeIDs: number[] = [];
				this.order.lead_types.forEach(type => {
					leadTypeIDs.push(type.lead_type_id);
				});
				this.types.setValue(leadTypeIDs);
				this.leadType = this.leadTypesFormGroup.value.lead_types;
				await this._retrieveCampaigns(leadTypeIDs);
			}
			if (this.order.providers.length > 0) {
				this.providers = this.order.providers;
				this.providerValue = false;
			} else {
				this.providerValue = true;
			}
		}
	}

	/** Start - Leads Type Checked functionality
	 * get the Provider list by LeadType Id wise
	 */
	public async addLeadTypes(leadTypesSelected: number[]): Promise<void> {
		const leadTypes = this.leadTypesFormGroup.controls.lead_types as FormArray;
		this.campaigns = null;
		while (leadTypes.length !== 0) {
			leadTypes.removeAt(0);
		}
		await leadTypesSelected.forEach((leadTypeID: number) => {
			this.leadTypes['data']
				.forEach(lead => {
				if (lead.id === +leadTypeID){
				leadTypes.push(this._formBuilder.group({ lead_type_id: leadTypeID, lead_type_name: lead.code }));
				}
			});
				// if (leadTypeID === 1) {
			// 	leadTypes.push(this._formBuilder.group({ lead_type_id: leadTypeID, lead_type_name: 'AUTO' }));
			// } else if (leadTypeID === 2) {
			// 	leadTypes.push(this._formBuilder.group({ lead_type_id: leadTypeID, lead_type_name: 'PAUTO' }));
			// } else if (leadTypeID === 3) {
			// 	leadTypes.push(this._formBuilder.group({ lead_type_id: leadTypeID, lead_type_name: 'HRAUTO' }));
			// }
		});
		if (leadTypesSelected.length > 0) {
			await this._retrieveCampaigns(leadTypesSelected); // get prviders list by selected leadTypeId
		}
		const providers = [];

		if (this.leadTypesFormGroup.value.providers.length > 0) {
			this.leadTypesFormGroup.value.providers.forEach((element, i) => {
				if (leadTypesSelected.indexOf(element.lead_type_id) !== -1 && element.checked !== false) {
					providers.push(element);
				} else {
					element.checked = false;
				}
			});
			this.leadTypesFormGroup.value.providers = providers;
			if (this.leadTypesFormGroup.value.providers.length === 0) {
				this.leadTypesFormGroup.setErrors({ invalid: true });
				this.providerValue = true;
			}
		}
	}
	/** return key-value pair */
	public objectKey(obj): string[] {
		return Object.keys(obj);
	}

	/** On providers check  */
	public async leadTypeSelected(checked: boolean, campaign: ICampaign): Promise<void> {
		let filterProviders = [];
		const providers = this.leadTypesFormGroup.controls.providers as FormArray;
		if (checked) {
			filterProviders = [];
			await providers.push(
				this._formBuilder.group({
					code: campaign.provider.code,
					campaign_code: campaign.code,
					lead_type_id: campaign.lead_type_id,
					name: campaign.provider.name,
					checked: checked
				})
			);
			await providers.value.map(element => {
				if (element.checked !== false) {
					filterProviders.push(element);
				}
			});
			this.providerValue = false;
			this.leadTypesFormGroup.value.providers = filterProviders;
			// if (this.leadTypesFormGroup.value.lead_types[0].lead_type_name === null) {
			// 	this.leadTypesFormGroup.value.lead_types = this.leadType;
			// }
		} else {
			await providers.removeAt(
				providers.value.findIndex(
					provider => provider.campaign_code === campaign.code && provider.code === campaign.provider.code
				)
			);
			await providers.value.map(element => {
				if (element.checked !== false) {
					filterProviders.push(element);
				}
			});

			this.leadTypesFormGroup.value.providers = filterProviders;
			if (filterProviders.length === 0) {
				this.leadTypesFormGroup.value.providers = [];
				this.leadTypesFormGroup.setErrors({ invalid: true });
				this.providerValue = true;
			} else {
				this.providerValue = false;
			}
			// if (this.leadTypesFormGroup.value.lead_types[0].lead_type_name === null) {
			// 	this.leadTypesFormGroup.value.lead_types = this.leadType;
			// }
		}
	}

	/** return boolean value for providers check property  */
	public campaignChecked(campaign: ICampaign): boolean {
		if (campaign) {
			return this.leadTypesFormGroup.value.providers.filter(elem => {
				if (elem.code === campaign.provider.code && elem.campaign_code === campaign.code && elem.checked === true) {
					return true;
				}
			});
		}
	}

	/** get the providers on selected lead id */
	private _retrieveCampaigns(leadTypesSelected: number[]): void {
		this.loading = true;
		this._ordersService.getCampaigns(leadTypesSelected).subscribe((response: IApiSuccess<ICampaign[]>) => {
			this.leadTypeInfo = [];
			response.data.forEach(data => {
				if (!this.leadTypeInfo[data.name]) {
					this.leadTypeInfo[data.name] = [];
				}
				this.leadTypeInfo[data.name].push(data);
			});
			this.campaigns = response.data;
			this.loading = false;
			this._cd.detectChanges();
		});
	}

	addFakeData(): void {
		const value = this.fakeData[0].lead_types[Math.floor(Math.random() * this.fakeData[0].lead_types.length)];
		const leadTypeIDs = [];
		leadTypeIDs.push(value.lead_type_id);
		this.types.setValue(leadTypeIDs);
		value.providers.map(provider => {
			this.campaignChecked(provider);
		});
	}
}
