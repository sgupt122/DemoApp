import { Action } from '@ngrx/store';

import { IApiSuccess, ICampaign, ILeadType, IProvider } from '@/_interfaces';

export enum CampaignsActionTypes {
	SetCurrentCampaignID = '[Campaigns] Set Current Campaign ID',
	ClearCurrentCampaignID = '[Campaigns] Clear Current Campaign ID',
	InitializeCurrentCampaignID = '[Campaigns] Initialized Current Campaign ID',
	LoadCampaigns = '[Campaigns] Campaigns Load',
	LoadCampaignsSuccess = '[Campaigns] Load Campaigns Success',
	LoadCampaignsFail = '[Campaigns] Load Campaigns Fail',
	UpdateCampaign = '[Campaigns] Update Campaign',
	UpdateCampaignSuccess = '[Campaigns] Update Campaign Success',
	UpdateCampaignFail = '[Campaigns] Update Campaign Fail',
	CreateCampaign = '[Campaigns] Create Campaign',
	CreateCampaignSuccess = '[Campaigns] Create Campaign Success',
	CreateCampaignFail = '[Campaigns] Create Campaign Fail',
	LoadProviders = '[Campaigns] Load Providers',
	LoadProvidersSuccess = '[Campaigns] Load Providers Success',
	LoadProvidersFail = '[Campaigns] Load Providers Fail',
	LoadLeadTypes = '[Campaigns] Load Lead Types',
	LoadLeadTypesSuccess = '[Campaigns] Load Lead Types Success',
	LoadLeadTypesFail = '[Campaigns] Load Lead Types Fail',
	LoadColumns = '[Campaigns] Load Columns',
	LoadColumnsSuccess = '[Campaigns] Load Columns Success',
	LoadColumnsFail = '[Campaigns] Load Columns Fail',
	UpdateColumns = '[Campaigns] Update Columns',
	UpdateColumnsSuccess = '[Campaigns] Update Columns Success',
	UpdateColumnsFail = '[Campaigns] Update Columns Fail'
}
export class SetCurrentCampaignID implements Action {
	public readonly type = CampaignsActionTypes.SetCurrentCampaignID;

	constructor(public payload: ICampaign) {}
}

export class ClearCurrentCampaignID implements Action {
	public readonly type = CampaignsActionTypes.ClearCurrentCampaignID;
}

export class InitializeCurrentCampaignID implements Action {
	public readonly type = CampaignsActionTypes.InitializeCurrentCampaignID;
}

export class LoadCampaigns implements Action {
	public readonly type = CampaignsActionTypes.LoadCampaigns;
}

export class LoadCampaignsSuccess implements Action {
	public readonly type = CampaignsActionTypes.LoadCampaignsSuccess;

	constructor(public payload: IApiSuccess<ICampaign[]>) {}
}

export class LoadCampaignsFail implements Action {
	public readonly type = CampaignsActionTypes.LoadCampaignsFail;

	constructor(public payload: string) {}
}

export class UpdateCampaign implements Action {
	public readonly type = CampaignsActionTypes.UpdateCampaign;

	constructor(public payload: ICampaign) {}
}

export class UpdateCampaignSuccess implements Action {
	public readonly type = CampaignsActionTypes.UpdateCampaignSuccess;

	constructor(public payload: IApiSuccess<ICampaign>) {}
}

export class UpdateCampaignFail implements Action {
	public readonly type = CampaignsActionTypes.UpdateCampaignFail;

	constructor(public payload: string) {}
}

export class CreateCampaign implements Action {
	public readonly type = CampaignsActionTypes.CreateCampaign;

	constructor(public payload: ICampaign) {}
}

export class CreateCampaignSuccess implements Action {
	public readonly type = CampaignsActionTypes.CreateCampaignSuccess;

	constructor(public payload: IApiSuccess<ICampaign>) {}
}

export class CreateCampaignFail implements Action {
	public readonly type = CampaignsActionTypes.CreateCampaignFail;

	constructor(public payload: string) {}
}

export class LoadProviders implements Action {
	public readonly type = CampaignsActionTypes.LoadProviders;
}

export class LoadProvidersSuccess implements Action {
	public readonly type = CampaignsActionTypes.LoadProvidersSuccess;

	constructor(public payload: IApiSuccess<IProvider[]>) {}
}

export class LoadProvidersFail implements Action {
	public readonly type = CampaignsActionTypes.LoadProvidersFail;

	constructor(public payload: string) {}
}

export class LoadLeadTypes implements Action {
	public readonly type = CampaignsActionTypes.LoadLeadTypes;
}

export class LoadLeadTypesSuccess implements Action {
	public readonly type = CampaignsActionTypes.LoadLeadTypesSuccess;

	constructor(public payload: IApiSuccess<ILeadType[]>) {}
}

export class LoadLeadTypesFail implements Action {
	public readonly type = CampaignsActionTypes.LoadLeadTypesFail;

	constructor(public payload: string) {}
}

export class LoadColumns implements Action {
	public readonly type = CampaignsActionTypes.LoadColumns;
}

export class LoadColumnsSuccess implements Action {
public readonly type = CampaignsActionTypes.LoadColumnsSuccess;

constructor(public payload: any) { }
}

export class LoadColumnsFail implements Action {
public readonly type = CampaignsActionTypes.LoadColumnsFail;

constructor(public payload: any) { }
}

export class UpdateColumns implements Action {
	public readonly type = CampaignsActionTypes.UpdateColumns;

	constructor(public payload: any) { }
}

export class UpdateColumnsSuccess implements Action {
public readonly type = CampaignsActionTypes.UpdateColumnsSuccess;

constructor(public payload: any) { }
}

export class UpdateColumnsFail implements Action {
public readonly type = CampaignsActionTypes.UpdateColumnsFail;

constructor(public payload: any) { }
}
export type CampaignsActions =
	| SetCurrentCampaignID
	| ClearCurrentCampaignID
	| InitializeCurrentCampaignID
	| LoadCampaigns
	| LoadCampaignsSuccess
	| LoadCampaignsFail
	| UpdateCampaign
	| UpdateCampaignSuccess
	| UpdateCampaignFail
	| CreateCampaign
	| CreateCampaignSuccess
	| CreateCampaignFail
	| LoadProviders
	| LoadProvidersSuccess
	| LoadProvidersFail
	| LoadLeadTypes
	| LoadLeadTypesFail
	| LoadLeadTypesSuccess
	| LoadColumns
	| LoadColumnsSuccess
	| LoadColumnsFail
	| UpdateColumns
	| UpdateColumnsSuccess
	| UpdateColumnsFail;
