import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
	selector: 'app-agents-add-edit',
	templateUrl: './agents-add-edit.component.html',
	styleUrls: ['./agents-add-edit.component.scss'],
	animations: fuseAnimations
})
export class AgentsAddEditComponent implements OnInit {
	@Input() public selectedAgent;
	@Output() public newAgentClicked: EventEmitter<boolean> = new EventEmitter();
	constructor() {}

	public ngOnInit(): void {}

	public newAgent(): void {
		this.newAgentClicked.emit(true);
	}
}
