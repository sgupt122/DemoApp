import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
	selector: 'app-campaings-add-edit',
	templateUrl: './campaings-add-edit.component.html',
	styleUrls: ['./campaings-add-edit.component.scss'],
	animations: fuseAnimations
})
export class CampaingsAddEditComponent implements OnInit {
	@Input() public selectedCampaign;
	@Output() public newCampaignClicked: EventEmitter<boolean> = new EventEmitter();
	constructor() {}

	public ngOnInit(): void {}

	public newCampaign(): void {
		this.newCampaignClicked.emit(true);
	}
}
