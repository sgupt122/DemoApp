import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { IPrice, ILeadType, IProvider } from '@/_interfaces';
import { SharedFunctions } from '@/shared/sharedFunctions';

@Component({
	selector: 'app-pricing-form',
	templateUrl: './pricing-form.component.html',
	styleUrls: ['./pricing-form.component.scss'],
	animations: fuseAnimations
})
export class PricingFormComponent implements OnInit {
	@Input() public action: string;
	@Input() public price: IPrice;
	@Input() public providers: IProvider[];
	@Input() public leadTypes: ILeadType[];
	@Output() public create = new EventEmitter<IPrice>();
	@Output() public update = new EventEmitter<IPrice>();
	public form: FormGroup;

	/**
	 * Constructor
	 *
	 * @param {FormBuilder} _formBuilder
	 * @param {Router} _router
	 */
	constructor(private shared: SharedFunctions, private _formBuilder: FormBuilder, private _router: Router) { }

	public ngOnInit(): Promise<boolean> {
		if (!this.price) {
			return this._router.navigate(['/pricing']);
		}
		this.form = this._createForm();
	}

	public savePrice(price: IPrice): void {
		this.shared._snackbarMessage('Price saved!', 1000)
			.afterDismissed()
			.subscribe(() => {
				this._router.navigate(['/pricing']);
			});
		if (price.id) {
			return this.update.emit(price);
		}
		this.create.emit(price);
	}

	private _createForm(): FormGroup {
		return this._formBuilder.group({
			id: [this.price.id || null],
			provider_id: [this.price.provider_id || '', Validators.required],
			name: [this.price.name || '', [Validators.required, Validators.minLength(3)]],
			code: [this.price.code || '', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
			lead_type_id: [this.price.lead_type_id || '', Validators.required],
			billing_code: [this.price.billing_code || ''],
			activated_date: [this.price.activated_date || ''],
			active: [this.price.active || 0, Validators.required]
		});
	}
}
