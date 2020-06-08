import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { IProvider } from '@/_interfaces';
import { provider, commonBtn } from '@/_config/config';

@Component({
	selector: 'app-providers-form',
	templateUrl: './providers-form.component.html',
	styleUrls: ['./providers-form.component.scss'],
	animations: fuseAnimations
})
export class ProvidersFormComponent implements OnChanges, OnInit {
	@Input() public action: string;
	@Input() public provider: IProvider;
	@Input() public errors;
	@Output() public create = new EventEmitter<IProvider>();
	@Output() public update = new EventEmitter<IProvider>();
	public sending: boolean = false;
	public success: boolean = false;
	public formattedErrors;
	public providerFormConfig = {
		provider: provider.providerForm,
		commonBtn: commonBtn,
		providers: provider.providers
	}
	/**
	 * Constructor
	 *
	 * @param {Router} _router
	 */
	constructor(private _router: Router) { }

	public ngOnInit(): Promise<boolean> {
		if (!this.provider) {
			return this._router.navigate(['/providers']);
		}
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.errors && !changes.errors.firstChange) {
			this.sending = false;
		}
		if (changes.provider && !changes.provider.firstChange && !changes.errors) {
			this.sending = false;
			this.success = true;
			setTimeout(() => {
				this._router.navigate(['/providers']);
			}, 1000);
		}
	}

	public saveProvider(provider: IProvider): void {
		this.sending = true;
		if (this.provider.id) {
			return this.update.emit(this.provider);
		}
		this.create.emit(provider);
	}
}
