import { Action } from '@ngrx/store';

import { IApiSuccess, IFaq } from '@/_interfaces';

export enum FaqsActionTypes {
	SetCurrentFaqID = '[Faqs] Set Current Faq ID',
	ClearCurrentFaqID = '[Faqs] Clear Current Faq ID',
	InitializeCurrentFaqID = '[Faqs] Initialized Current Faq ID',
	Load = '[Faqs] Load',
	LoadSuccess = '[Faqs] Load Success',
	LoadFail = '[Faqs] Load Fail',
	UpdateFaq = '[Faqs] Update Faq',
	UpdateFaqsSuccess = '[Faqs] Update Faq Success',
	UpdateFaqFail = '[Faqs] Update Faq Fail',
	CreateFaq = '[Faqs] Create Faq',
	CreateFaqsSuccess = '[Faqs] Create Faq Success',
	CreateFaqFail = '[Faqs] Create Faq Fail'
}
export class SetCurrentFaqID implements Action {
	public readonly type = FaqsActionTypes.SetCurrentFaqID;

	constructor(public payload: IFaq) {}
}

export class ClearCurrentFaqID implements Action {
	public readonly type = FaqsActionTypes.ClearCurrentFaqID;
}

export class InitializeCurrentFaqID implements Action {
	public readonly type = FaqsActionTypes.InitializeCurrentFaqID;
}

export class Load implements Action {
	public readonly type = FaqsActionTypes.Load;
}

export class LoadSuccess implements Action {
	public readonly type = FaqsActionTypes.LoadSuccess;

	constructor(public payload: IApiSuccess<IFaq[]>) {}
}

export class LoadFail implements Action {
	public readonly type = FaqsActionTypes.LoadFail;

	constructor(public payload: string) {}
}

export class UpdateFaq implements Action {
	public readonly type = FaqsActionTypes.UpdateFaq;

	constructor(public payload: IFaq) {}
}

export class UpdateFaqsSuccess implements Action {
	public readonly type = FaqsActionTypes.UpdateFaqsSuccess;

	constructor(public payload: IApiSuccess<IFaq>) {}
}

export class UpdateFaqFail implements Action {
	public readonly type = FaqsActionTypes.UpdateFaqFail;

	constructor(public payload: string) {}
}

export class CreateFaq implements Action {
	public readonly type = FaqsActionTypes.CreateFaq;

	constructor(public payload: IFaq) {}
}

export class CreateFaqsSuccess implements Action {
	public readonly type = FaqsActionTypes.CreateFaqsSuccess;

	constructor(public payload: IApiSuccess<IFaq>) {}
}

export class CreateFaqFail implements Action {
	public readonly type = FaqsActionTypes.CreateFaqFail;

	constructor(public payload: string) {}
}

export type FaqsActions =
	| SetCurrentFaqID
	| ClearCurrentFaqID
	| InitializeCurrentFaqID
	| Load
	| LoadSuccess
	| LoadFail
	| UpdateFaq
	| UpdateFaqsSuccess
	| UpdateFaqFail
	| CreateFaq
	| CreateFaqsSuccess
	| CreateFaqFail;
