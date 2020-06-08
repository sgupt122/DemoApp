import { Component, Input } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

@Component({
	selector: 'app-form-request',
	templateUrl: './form-request.component.html',
	styleUrls: ['./form-request.component.scss'],
	animations: fuseAnimations
})
export class FormRequestComponent {
	@Input() public sending;
	@Input() public success;
}
