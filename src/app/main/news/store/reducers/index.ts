import { createFeatureSelector, createSelector } from '@ngrx/store';

import { NewsActions, NewsActionTypes } from '@/main/news/store';
import { IApiSuccess, INews } from '@/_interfaces';
import { IAppState } from '@/app.state';

export interface NewsState extends IAppState {
	news: INewsState;
}

export interface INewsState {
	currentNewsID: number | null;
	news: IApiSuccess<INews[]>;
	error: string;
}

const initialNewsState: INewsState = {
	currentNewsID: null,
	news: { data: [], meta: {} },
	error: ''
};
const getNewsFeatureState = createFeatureSelector<INewsState>('news');

export const getCurrentNewsID = createSelector(
	getNewsFeatureState,
	state => state.currentNewsID
);
export const getCurrentNews = createSelector(
	getNewsFeatureState,
	getCurrentNewsID,
	(state, currentNewsID) => {
		if (currentNewsID === 0) {
			return {
				title: '',
				content: '',
				category: 1,
				order: 0,
				active: 0,
				user_id: 0,
				activated_date: ''
			};
		}
		return currentNewsID ? state.news.data.find(n => n.id === currentNewsID) : null;
	}
);
export const getNews = createSelector(
	getNewsFeatureState,
	state => state.news.data
);
export const getError = createSelector(
	getNewsFeatureState,
	state => state.error
);
export function reducer(state = initialNewsState, action: NewsActions): INewsState {
	switch (action.type) {
		case NewsActionTypes.SetCurrentNewsID:
			return {
				...state,
				currentNewsID: action.payload
			};
		case NewsActionTypes.ClearCurrentNewsID:
			return {
				...state,
				currentNewsID: null
			};
		case NewsActionTypes.InitializeCurrentNewsID:
			return {
				...state,
				currentNewsID: 0
			};
		case NewsActionTypes.LoadNewsSuccess:
			return {
				...state,
				news: action.payload,
				error: ''
			};
		case NewsActionTypes.LoadNewsFail:
			return {
				...state,
				news: { data: [], meta: {} },
				error: action.payload
			};
		case NewsActionTypes.UpdateNewsSuccess:
			const updatedNewsResponse = state.news;
			const updatedNews = state.news.data.map(news =>
				action.payload.data.id === news.id ? action.payload.data : news
			);
			updatedNewsResponse.data = updatedNews;
			return {
				...state,
				news: updatedNewsResponse,
				currentNewsID: action.payload.data.id,
				error: ''
			};
		case NewsActionTypes.UpdateNewsFail:
			return {
				...state,
				error: action.payload
			};
		case NewsActionTypes.CreateNewsSuccess:
			const createdNewsResponse = state.news;
			const createdNews = [...state.news.data, action.payload.data];
			createdNewsResponse.data = createdNews;
			return {
				...state,
				news: createdNewsResponse,
				currentNewsID: action.payload.data.id,
				error: ''
			};
		case NewsActionTypes.CreateNewsFail:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
}
