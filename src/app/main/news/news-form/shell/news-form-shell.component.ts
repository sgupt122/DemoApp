import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { LocalStorage } from 'ngx-webstorage';
import { Observable } from 'rxjs';

import { INews, IUser } from '@/_interfaces';
import * as fromNews from '@/main/news/store';

@Component({
	selector: 'app-news-form-shell',
	templateUrl: './news-form-shell.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsFormShellComponent implements OnInit {
	@LocalStorage() public user: IUser;
	public newsItem$: Observable<INews>;
	public action: string;

	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {ActivatedRoute} _route
	 * @param {Title} _titleService
	 */
	constructor(
		private _store: Store<fromNews.NewsState>,
		private _route: ActivatedRoute,
		private _titleService: Title
	) {}

	public ngOnInit(): void {
		this._titleService.setTitle(`News Form - Charcoal`);
		this.newsItem$ = this._store.pipe(select(fromNews.getCurrentNews));
		this._route.params.subscribe((params: { action: string }) => {
			this.action = params.action;
		});
	}

	public create(newsItem: INews): void {
		this._store.dispatch(new fromNews.CreateNews(newsItem));
	}

	public update(newsItem: INews): void {
		this._store.dispatch(new fromNews.UpdateNews(newsItem));
	}
}
