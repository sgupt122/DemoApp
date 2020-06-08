import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ICampaign, ILeadType, IProvider } from '@/_interfaces';
import * as fromCampaigns from '@/main/campaigns/store';

@Component({
	selector: 'app-campaigns-form-shell',
	templateUrl: './campaigns-form-shell.component.html'
})
export class CampaignsFormShellComponent implements OnInit {
	public campaign$: Observable<ICampaign>;
	public providers$: Observable<IProvider[]>;
	public leadTypes$: Observable<ILeadType[]>;
	public error$: Observable<string>;
	public action: string;

	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Title} _titleService
	 * @param {ActivatedRoute} _route
	 */
	constructor(
		private _store: Store<fromCampaigns.CampaignsState>,
		private _titleService: Title,
		private _route: ActivatedRoute
	) {}

	public ngOnInit(): void {
		this._titleService.setTitle(`Campaigns Form - Charcoal`);
		this._route.params.subscribe((params: { action: string }) => {
			this.action = params.action;
		});
		this._store.dispatch(new fromCampaigns.LoadProviders());
		this._store.dispatch(new fromCampaigns.LoadLeadTypes());
		this.campaign$ = this._store.pipe(select(fromCampaigns.getCurrentCampaign));
		this.providers$ = this._store.pipe(select(fromCampaigns.getProviders));
		this.leadTypes$ = this._store.pipe(select(fromCampaigns.getLeadTypes));
		this.error$ = this._store.pipe(select(fromCampaigns.getError));
	}

	public create(campaign: ICampaign): void {
		this._store.dispatch(new fromCampaigns.CreateCampaign(campaign));
	}

	public update(campaign: ICampaign): void {
		this._store.dispatch(new fromCampaigns.UpdateCampaign(campaign));
	}
}
