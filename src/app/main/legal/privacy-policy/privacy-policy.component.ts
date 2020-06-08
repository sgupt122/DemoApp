import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { legal } from '@/_config/config';

@Component({
	selector: 'app-privacy-policy',
	templateUrl: './privacy-policy.component.html',
	styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
	public privacyConfig = legal;
	/**
	 * Constructor
	 *
	 * @param {Title} _titleService
	 */
	constructor(private _titleService: Title) { }

	public ngOnInit(): void {
		this._titleService.setTitle('Privacy Policy - Charcoal');
	}
}
