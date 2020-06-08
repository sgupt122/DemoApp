import { Action } from '@ngrx/store';

import { IApiSuccess, IProvider, IProviderFormErrors } from '@/_interfaces';

export enum ProvidersActionTypes {
	SetCurrentProviderID = '[Providers] Set Current Provider ID',
	ClearCurrentProviderID = '[Providers] Clear Current Provider ID',
	InitializeCurrentProviderID = '[Providers] Initialized Current Provider ID',
	LoadProviders = '[Providers] Providers Load',
	LoadProvidersSuccess = '[Providers] Load Providers Success',
	LoadProvidersFail = '[Providers] Load Providers Fail',
	UpdateProvider = '[Providers] Update Provider',
	UpdateProviderSuccess = '[Providers] Update Provider Success',
	UpdateProviderFail = '[Providers] Update Provider Fail',
	CreateProvider = '[Providers] Create Provider',
	CreateProviderSuccess = '[Providers] Create Provider Success',
	CreateProviderFail = '[Providers] Create Provider Fail',
	LoadColumns = '[Providers] Load Columns',
	LoadColumnsSuccess = '[Providers] Load Columns Success',
	LoadColumnsFail = '[Providers] Load Columns Fail',
	UpdateColumns = '[Providers] Update Columns',
	UpdateColumnsSuccess = '[Providers] Update Columns Success',
	UpdateColumnsFail = '[Providers] Update Columns Fail'
}
export class SetCurrentProviderID implements Action {
	public readonly type = ProvidersActionTypes.SetCurrentProviderID;

	constructor(public payload: IProvider) {}
}

export class ClearCurrentProviderID implements Action {
	public readonly type = ProvidersActionTypes.ClearCurrentProviderID;
}

export class InitializeCurrentProviderID implements Action {
	public readonly type = ProvidersActionTypes.InitializeCurrentProviderID;
}

export class LoadProviders implements Action {
	public readonly type = ProvidersActionTypes.LoadProviders;
}

export class LoadProvidersSuccess implements Action {
	public readonly type = ProvidersActionTypes.LoadProvidersSuccess;

	constructor(public payload: IApiSuccess<IProvider[]>) {}
}

export class LoadProvidersFail implements Action {
	public readonly type = ProvidersActionTypes.LoadProvidersFail;

	constructor(public payload: any) {}
}

export class UpdateProvider implements Action {
	public readonly type = ProvidersActionTypes.UpdateProvider;

	constructor(public payload: IProvider) {}
}

export class UpdateProviderSuccess implements Action {
	public readonly type = ProvidersActionTypes.UpdateProviderSuccess;

	constructor(public payload: IApiSuccess<IProvider>) {}
}

export class UpdateProviderFail implements Action {
	public readonly type = ProvidersActionTypes.UpdateProviderFail;

	constructor(public payload: IProviderFormErrors) {}
}

export class CreateProvider implements Action {
	public readonly type = ProvidersActionTypes.CreateProvider;

	constructor(public payload: IProvider) {}
}

export class CreateProviderSuccess implements Action {
	public readonly type = ProvidersActionTypes.CreateProviderSuccess;

	constructor(public payload: IApiSuccess<IProvider>) {}
}

export class CreateProviderFail implements Action {
	public readonly type = ProvidersActionTypes.CreateProviderFail;

	constructor(public payload: IProviderFormErrors) {}
}
export class LoadColumns implements Action {
	public readonly type = ProvidersActionTypes.LoadColumns;
}

export class LoadColumnsSuccess implements Action {
public readonly type = ProvidersActionTypes.LoadColumnsSuccess;

constructor(public payload: any) { }
}

export class LoadColumnsFail implements Action {
public readonly type = ProvidersActionTypes.LoadColumnsFail;

constructor(public payload: any) { }
}

export class UpdateColumns implements Action {
	public readonly type = ProvidersActionTypes.UpdateColumns;

	constructor(public payload: any) { }
}

export class UpdateColumnsSuccess implements Action {
public readonly type = ProvidersActionTypes.UpdateColumnsSuccess;

constructor(public payload: any) { }
}

export class UpdateColumnsFail implements Action {
public readonly type = ProvidersActionTypes.UpdateColumnsFail;

constructor(public payload: any) { }
}

export type ProvidersActions =
	| SetCurrentProviderID
	| ClearCurrentProviderID
	| InitializeCurrentProviderID
	| LoadProviders
	| LoadProvidersSuccess
	| LoadProvidersFail
	| UpdateProvider
	| UpdateProviderSuccess
	| UpdateProviderFail
	| CreateProvider
	| CreateProviderSuccess
	| CreateProviderFail
	| LoadColumns
	| LoadColumnsSuccess
	| LoadColumnsFail
	| UpdateColumns
	| UpdateColumnsSuccess
	| UpdateColumnsFail;
