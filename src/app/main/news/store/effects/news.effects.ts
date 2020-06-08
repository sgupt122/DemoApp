import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { NewsService } from '@/_services';
import { INews, IApiSuccess } from '@/_interfaces';
import * as fromNews from '@/main/news/store';

@Injectable()
export class NewsEffects {
	/**
	 * Constructor
	 *
	 * @param {Actions} _actions$
	 * @param {NewsService} _newsService
	 */
	constructor(private _actions$: Actions, private _newsService: NewsService) {}

	@Effect()
	loadNews$ = this._actions$.pipe(
		ofType(fromNews.NewsActionTypes.LoadNews),
		mergeMap((action: fromNews.LoadNews) =>
			this._newsService.getNews().pipe(
				map((news: IApiSuccess<INews[]>) => new fromNews.LoadNewsSuccess(news)),
				catchError(err => of(new fromNews.LoadNewsFail(err.error.message)))
			)
		)
	);

	@Effect()
	updateNews$ = this._actions$.pipe(
		ofType(fromNews.NewsActionTypes.UpdateNews),
		map((action: fromNews.UpdateNews) => action.payload),
		mergeMap((news: INews) =>
			this._newsService.updateNews(news).pipe(
				map((updatedNews: IApiSuccess<INews>) => new fromNews.UpdateNewsSuccess(updatedNews)),
				catchError(err => of(new fromNews.UpdateNewsFail(err.error.message)))
			)
		)
	);

	@Effect()
	createNews$: Observable<Action> = this._actions$.pipe(
		ofType(fromNews.NewsActionTypes.CreateNews),
		map((action: fromNews.CreateNews) => action.payload),
		mergeMap((news: INews) =>
			this._newsService.createNews(news).pipe(
				map((newsItem: IApiSuccess<INews>) => new fromNews.CreateNewsSuccess(newsItem)),
				catchError(err => of(new fromNews.CreateNewsFail(err.error.message)))
			)
		)
	);
}
