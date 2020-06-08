import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
	selector: 'app-pricing-add-edit',
	templateUrl: './pricing-add-edit.component.html',
	styleUrls: ['./pricing-add-edit.component.scss'],
	animations: fuseAnimations
})
export class PricingAddEditComponent implements OnInit {
	@Input() public selectedPrice;
	@Output() public newPriceClicked: EventEmitter<boolean> = new EventEmitter();
	constructor() {}

	public ngOnInit(): void {}

	public newPrice(): void {
		this.newPriceClicked.emit(true);
	}
}
