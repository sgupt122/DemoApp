import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@/_services';
import { INews } from '@/_interfaces';
import * as fromNews from '@/main/news/store';

@Component({
	selector: 'app-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: fuseAnimations
})
export class NewsComponent implements OnInit {
	public news$: Observable<INews[]>;
	public selected$: Observable<INews>;
	public errorMessage$: Observable<string>;
	public isAdmin: boolean = false;
	public filteredNews: INews[];

	constructor(
		private _store: Store<fromNews.NewsState>,
		private _titleService: Title,
		private _authService: AuthenticationService
	) {}

	public ngOnInit(): void {
		this._titleService.setTitle(`News - Charcoal`);
		this.isAdmin = this._authService.isAdmin();
		this._store.dispatch(new fromNews.LoadNews());
		this.news$ = this._store.pipe(select(fromNews.getNews));
		this.selected$ = this._store.pipe(select(fromNews.getCurrentNews));
		this.errorMessage$ = this._store.pipe(select(fromNews.getError));
	}

	public updateFilteredRows(news: INews[]): void {
		this.filteredNews = [...news];
	}

	public newsItemSelected(newsID: number | null): void {
		if (!newsID) {
			return this._store.dispatch(new fromNews.ClearCurrentNewsID());
		}
		this._store.dispatch(new fromNews.SetCurrentNewsID(newsID));
	}

	public newNewsItem(): void {
		this._store.dispatch(new fromNews.InitializeCurrentNewsID());
	}
}
