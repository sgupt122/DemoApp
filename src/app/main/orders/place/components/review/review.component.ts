import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { IOrderProvider, IOrder } from '@/_interfaces';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { commonBtn, commonInfo, order } from '@/_config/config';

export interface LeadTypes {
	lead_type: string[],
	providers: IOrderProvider[]
}


@Component({
	selector: 'app-review',
	templateUrl: './review.component.html',
	styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
	@Input() private stepper: MatStepper;
	@Input() public orderFormGroup: FormGroup;
	@Input() private isEditMode: boolean;
	@Input() private order: IOrder;
	@Output() private saveOrder: EventEmitter<boolean> = new EventEmitter();
	private distributions: LeadTypes[] = [];
	public days: string[] = this.shared.days;
	public orderInfo = {
		commonBtn: commonBtn,
		commonInfo: commonInfo.commonFormLabels,
		commonLb: order
	}
	constructor(private shared: SharedFunctions) { }
	ngOnInit(): void {
	}

	/** on clicking save button */
	public save(): void {
		this.saveOrder.emit(true);
	}

	/** on clicking edit button for editing particular form  */
	public step(index: number): void {
		this.stepper.selectedIndex = index;
	}
}
