import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-request-errors',
	templateUrl: './request-errors.component.html',
	styleUrls: ['./request-errors.component.scss']
})
export class RequestErrorsComponent implements OnInit {
	@Input() public errors;

	constructor() {}

	public ngOnInit(): void {
		this.errors = Object.keys(this.errors).map(error => this.errors[error][0]);
	}
}
