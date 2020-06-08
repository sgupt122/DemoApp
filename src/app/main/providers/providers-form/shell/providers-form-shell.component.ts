import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IProvider, IProviderFormErrors } from '@/_interfaces';
import * as fromProviders from '@/main/providers/store';

@Component({
	selector: 'app-providers-form-shell',
	templateUrl: './providers-form-shell.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvidersFormShellComponent implements OnInit {
	public provider$: Observable<IProvider>;
	public errors$: Observable<IProviderFormErrors>;
	public action: string;

	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Title} _titleService
	 * @param {ActivatedRoute} _route
	 */
	constructor(
		private _store: Store<fromProviders.ProvidersState>,
		private _titleService: Title,
		private _route: ActivatedRoute
	) {}

	public ngOnInit(): void {
		this._titleService.setTitle(`Provider Form - Charcoal`);
		this._route.params.subscribe((params: { action: string }) => {
			this.action = params.action;
		});
		this.provider$ = this._store.pipe(select(fromProviders.getCurrentProvider));
		this.errors$ = this._store.pipe(select(fromProviders.getError));
	}

	public create(provider: IProvider): void {
		this._store.dispatch(new fromProviders.CreateProvider(provider));
	}

	public update(provider: IProvider): void {
		this._store.dispatch(new fromProviders.UpdateProvider(provider));
	}
}
