import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as fromOrders from '@/main/orders/store';

import { fuseAnimations } from '@fuse/animations';
import { IApiError, IApiSuccess, ILeadType, IOrder, IOrderDistributionType, IUser } from '@/_interfaces';
import { Store } from '@ngrx/store';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { LocalStorage } from 'ngx-webstorage';
import { order } from '@/_config/config';

@Component({
	selector: 'app-place',
	templateUrl: './place.component.html',
	styleUrls: ['./place.component.scss'],
	animations: fuseAnimations
})
export class PlaceComponent implements OnInit {
	@LocalStorage() impersonateToken: string;
	@Input() public order: IOrder;
	@Input() private errors: string[];
	@Input() public leadTypes: IApiSuccess<ILeadType[]> | IApiError;
	@Input() public distributionTypes: IApiSuccess<IOrderDistributionType[]>;
	@Input() private action: string;
	@Input() private user: IUser;
	@Input() public isEditMode: boolean;
	public orderFormGroup: FormGroup;
	public orderConfig = order.orderPlace;

	/**
	 * Constructor
	 *
	 * @param {FormBuilder} _formBuilder
	 * @param {Router} _router
	 */
	constructor(private shared: SharedFunctions, private _formBuilder: FormBuilder, private _router: Router,
		private _store: Store<fromOrders.OrdersState>) { }

	public ngOnInit(): Promise<boolean> {
		if (!this.order) {
			return this._router.navigate(['/orders']);
		}

		this.orderFormGroup = this._buildForm();
		if (this.isEditMode) {
			this.orderFormGroup.controls['id'].setValue(this.order.id);
			this.orderFormGroup.value.types.lead_types = this.order.lead_types;
			this.orderFormGroup.value.types.providers = this.order.providers;
		}
	}

	/** on order save  */
	public save(): void {
		this.orderFormGroup.value.description = this.orderFormGroup.value.details.description;
		this.orderFormGroup.value.timezone = this.user.profile.timezone;
		this.orderFormGroup.value.month = this.orderFormGroup.value.details.month;
		this.orderFormGroup.value.day = this.orderFormGroup.value.details.day;
		this.orderFormGroup.value.hour = this.orderFormGroup.value.details.hour;
		this.orderFormGroup.value.minute = this.orderFormGroup.value.details.minute;
		this.orderFormGroup.value.lead_types = this.orderFormGroup.value.types.lead_types;
		this.orderFormGroup.value.providers = this.orderFormGroup.value.types.providers;
		this.orderFormGroup.value.impersonateToken = this.impersonateToken;

		if (this.isEditMode) {
			this._store.dispatch(new fromOrders.UpdateOrder(this.orderFormGroup.value));
		}
		else {
			this._store.dispatch(new fromOrders.CreateOrder(this.orderFormGroup.value));
		}
		this.shared._snackbarMessage('Order Saved!', 1500)
			.afterDismissed()
			.subscribe(() => {
				this._store.dispatch(new fromOrders.ClearCurrentOrderID());
				this._router.navigate(['/orders']);
			});
		// Object.keys(this.orderFormGroup.controls).forEach(orderForm => {
		// this._order[orderForm] = this.orderFormGroup.controls[orderForm].value;
		// });
	}

	/** creating the structure of the order form */
	private _buildForm(): FormGroup {
		return this._formBuilder.group({
			id: [1],
			user_id: [this.user.id],
			modifier_id: [this.user.id],
			order_type_id: [this.order.order_type_id, Validators.required],
			status_id: [this.order.status_id],
			details: this._formBuilder.group({
				description: [this.order.description, Validators.required],
				timezone: [this.order.timezone],
				month: [this.order.month, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
				day: [this.order.day, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
				hour: [this.order.hour, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
				minute: [this.order.minute, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
			}),
			types: this._formBuilder.group({
				lead_types: this._formBuilder.array(this._buildLeadTypes(), Validators.required),
				providers: this._formBuilder.array(this._buildProviders(), Validators.required)
			}),
			schedules: this._formBuilder.group({
				data: this._formBuilder.array(this._buildSchedules(), Validators.required),
			}),
			geos: this._formBuilder.group({
				data: this._formBuilder.array(this._buildGeos(), Validators.required),
			}),
			distributions: this._formBuilder.group({
				data: this._formBuilder.array(this._buildDistributions(), Validators.required),
			})
		});
	}

	/** getting lead types on edit */
	private _buildLeadTypes(): { lead_type_id: number; lead_type_name: string }[] {
		const leadTypes = [];
		this.order.lead_types.forEach(leadType => {
			leadTypes.push(this._formBuilder.group({ lead_type_id: leadType.lead_type_id, lead_type_name: leadType.lead_type_name }));
		});
		return leadTypes;
	}

	/** getting providers on edit */
	private _buildProviders(): { code: string; campaign_code: string; checked: boolean; lead_type_id: string; name: string }[] {
		const providers = [];
		this.order.providers.forEach(provider => {
			providers.push(this._formBuilder.group({ code: provider.code, campaign_code: provider.campaign_code, checked: provider.checked, lead_type_id: provider.lead_type_id, name: provider.name }));
		});
		return providers;
	}

	/** getting distributions on edit */
	private _buildDistributions(): { recipient: string }[] {
		const distributions = [];
		this.order.distributions.forEach(distribution => {
			distributions.push(this._formBuilder.group({ recipient: distribution.recipient, order_distribution_type_id: distribution.order_distribution_type_id }));
		});
		return distributions;
	}

	/** getting geos on edit */
	private _buildGeos(): { zip: string, latitude: number, longitude: number, city: string }[] {
		const geos = [];
		this.order.geos.forEach(geo => {
			geos.push(this._formBuilder.group({ zip: geo.zip, latitude: geo.latitude, longitude: geo.longitude, city: geo.city, state: geo.state }));
		});
		return geos;
	}

	/** getting schedules on edit */
	private _buildSchedules(): { schedule: string }[] {
		const schedules = [];
		this.order.schedules.forEach(schedule => {
			schedules.push(schedule)
		});
		return schedules;
	}
}
