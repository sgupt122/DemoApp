import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
	selector: 'app-providers-add-edit',
	templateUrl: './providers-add-edit.component.html',
	styleUrls: ['../providers.component.scss'],
	animations: fuseAnimations
})
export class ProvidersAddEditComponent implements OnInit {
	@Input() public selectedProvider;
	@Output() public newProviderClicked: EventEmitter<boolean> = new EventEmitter();
	constructor() {}

	public ngOnInit(): void {}

	public newProvider(): void {
		this.newProviderClicked.emit(true);
	}
}
