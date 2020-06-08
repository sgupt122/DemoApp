import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { legal } from '@/_config/config';

@Component({
	selector: 'app-terms-and-conditions',
	templateUrl: './terms-and-conditions.component.html',
	styleUrls: ['./terms-and-conditions.component.scss']
})
export class TermsAndConditionsComponent implements OnInit {
	public privacyConfig = legal;
	/**
	 * Constructor
	 *
	 * @param {Title} _titleService
	 */
	constructor(private _titleService: Title) { }

	public ngOnInit(): void {
		this._titleService.setTitle('Terms and Conditions - Charcoal');
	}
}
