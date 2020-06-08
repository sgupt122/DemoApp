import { Action } from '@ngrx/store';

import { IApiSuccess, INews } from '@/_interfaces';

export enum NewsActionTypes {
	SetCurrentNewsID = '[News] Set Current News ID',
	ClearCurrentNewsID = '[News] Clear Current News ID',
	InitializeCurrentNewsID = '[News] Initialized Current News ID',
	LoadNews = '[News] News Load',
	LoadNewsSuccess = '[News] Load News Success',
	LoadNewsFail = '[News] Load News Fail',
	UpdateNews = '[News] Update News',
	UpdateNewsSuccess = '[News] Update News Success',
	UpdateNewsFail = '[News] Update News Fail',
	CreateNews = '[News] Create News',
	CreateNewsSuccess = '[News] Create News Success',
	CreateNewsFail = '[News] Create News Fail'
}
export class SetCurrentNewsID implements Action {
	public readonly type = NewsActionTypes.SetCurrentNewsID;

	constructor(public payload: number) {}
}

export class ClearCurrentNewsID implements Action {
	public readonly type = NewsActionTypes.ClearCurrentNewsID;
}

export class InitializeCurrentNewsID implements Action {
	public readonly type = NewsActionTypes.InitializeCurrentNewsID;
}

export class LoadNews implements Action {
	public readonly type = NewsActionTypes.LoadNews;
}

export class LoadNewsSuccess implements Action {
	public readonly type = NewsActionTypes.LoadNewsSuccess;

	constructor(public payload: IApiSuccess<INews[]>) {}
}

export class LoadNewsFail implements Action {
	public readonly type = NewsActionTypes.LoadNewsFail;

	constructor(public payload: string) {}
}

export class UpdateNews implements Action {
	public readonly type = NewsActionTypes.UpdateNews;

	constructor(public payload: INews) {}
}

export class UpdateNewsSuccess implements Action {
	public readonly type = NewsActionTypes.UpdateNewsSuccess;

	constructor(public payload: IApiSuccess<INews>) {}
}

export class UpdateNewsFail implements Action {
	public readonly type = NewsActionTypes.UpdateNewsFail;

	constructor(public payload: string) {}
}

export class CreateNews implements Action {
	public readonly type = NewsActionTypes.CreateNews;

	constructor(public payload: INews) {}
}

export class CreateNewsSuccess implements Action {
	public readonly type = NewsActionTypes.CreateNewsSuccess;

	constructor(public payload: IApiSuccess<INews>) {}
}

export class CreateNewsFail implements Action {
	public readonly type = NewsActionTypes.CreateNewsFail;

	constructor(public payload: string) {}
}

export type NewsActions =
	| SetCurrentNewsID
	| ClearCurrentNewsID
	| InitializeCurrentNewsID
	| LoadNews
	| LoadNewsSuccess
	| LoadNewsFail
	| UpdateNews
	| UpdateNewsSuccess
	| UpdateNewsFail
	| CreateNews
	| CreateNewsSuccess
	| CreateNewsFail;
