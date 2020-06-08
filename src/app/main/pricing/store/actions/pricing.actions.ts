import { Action } from '@ngrx/store';

import { IApiSuccess, IPrice, ILeadType, IProvider } from '@/_interfaces';

export enum PricingActionTypes {
	SetCurrentPriceID = '[Pricing] Set Current Price ID',
	ClearCurrentPriceID = '[Pricing] Clear Current Price ID',
	InitializeCurrentPriceID = '[Pricing] Initialized Current Price ID',
	LoadPricing = '[Pricing] Pricing Load',
	LoadPricingSuccess = '[Pricing] Load Pricing Success',
	LoadPricingFail = '[Pricing] Load Pricing Fail',
	UpdatePrice = '[Pricing] Update Price',
	UpdatePriceSuccess = '[Pricing] Update Price Success',
	UpdatePriceFail = '[Pricing] Update Price Fail',
	CreatePrice = '[Pricing] Create Price',
	CreatePriceSuccess = '[Pricing] Create Price Success',
	CreatePriceFail = '[Pricing] Create Price Fail',
	LoadProviders = '[Pricing] Load Providers',
	LoadProvidersSuccess = '[Pricing] Load Providers Success',
	LoadProvidersFail = '[Pricing] Load Providers Fail',
	LoadLeadTypes = '[Pricing] Load Lead Types',
	LoadLeadTypesSuccess = '[Pricing] Load Lead Types Success',
	LoadLeadTypesFail = '[Pricing] Load Lead Types Fail',
	LoadColumns = '[Pricing] Load Columns',
	LoadColumnsSuccess = '[Pricing] Load Columns Success',
	LoadColumnsFail = '[Pricing] Load Columns Fail',
	UpdateColumns = '[Pricing] Update Columns',
	UpdateColumnsSuccess = '[Pricing] Update Columns Success',
	UpdateColumnsFail = '[Pricing] Update Columns Fail'
}
export class SetCurrentPriceID implements Action {
	public readonly type = PricingActionTypes.SetCurrentPriceID;

	constructor(public payload: IPrice) {}
}

export class ClearCurrentPriceID implements Action {
	public readonly type = PricingActionTypes.ClearCurrentPriceID;
}

export class InitializeCurrentPriceID implements Action {
	public readonly type = PricingActionTypes.InitializeCurrentPriceID;
}

export class LoadPricing implements Action {
	public readonly type = PricingActionTypes.LoadPricing;
}

export class LoadPricingSuccess implements Action {
	public readonly type = PricingActionTypes.LoadPricingSuccess;

	constructor(public payload: IApiSuccess<IPrice[]>) {}
}

export class LoadPricingFail implements Action {
	public readonly type = PricingActionTypes.LoadPricingFail;

	constructor(public payload: string) {}
}

export class UpdatePrice implements Action {
	public readonly type = PricingActionTypes.UpdatePrice;

	constructor(public payload: IPrice) {}
}

export class UpdatePriceSuccess implements Action {
	public readonly type = PricingActionTypes.UpdatePriceSuccess;

	constructor(public payload: IApiSuccess<IPrice>) {}
}

export class UpdatePriceFail implements Action {
	public readonly type = PricingActionTypes.UpdatePriceFail;

	constructor(public payload: string) {}
}

export class CreatePrice implements Action {
	public readonly type = PricingActionTypes.CreatePrice;

	constructor(public payload: IPrice) {}
}

export class CreatePriceSuccess implements Action {
	public readonly type = PricingActionTypes.CreatePriceSuccess;

	constructor(public payload: IApiSuccess<IPrice>) {}
}

export class CreatePriceFail implements Action {
	public readonly type = PricingActionTypes.CreatePriceFail;

	constructor(public payload: string) {}
}

export class LoadProviders implements Action {
	public readonly type = PricingActionTypes.LoadProviders;
}

export class LoadProvidersSuccess implements Action {
	public readonly type = PricingActionTypes.LoadProvidersSuccess;

	constructor(public payload: IApiSuccess<IProvider[]>) {}
}

export class LoadProvidersFail implements Action {
	public readonly type = PricingActionTypes.LoadProvidersFail;

	constructor(public payload: string) {}
}

export class LoadLeadTypes implements Action {
	public readonly type = PricingActionTypes.LoadLeadTypes;
}

export class LoadLeadTypesSuccess implements Action {
	public readonly type = PricingActionTypes.LoadLeadTypesSuccess;

	constructor(public payload: IApiSuccess<ILeadType[]>) {}
}

export class LoadLeadTypesFail implements Action {
	public readonly type = PricingActionTypes.LoadLeadTypesFail;

	constructor(public payload: string) {}
}

export class LoadColumns implements Action {
	public readonly type = PricingActionTypes.LoadColumns;
}

export class LoadColumnsSuccess implements Action {
public readonly type = PricingActionTypes.LoadColumnsSuccess;

constructor(public payload: any) { }
}

export class LoadColumnsFail implements Action {
public readonly type = PricingActionTypes.LoadColumnsFail;

constructor(public payload: any) { }
}

export class UpdateColumns implements Action {
	public readonly type = PricingActionTypes.UpdateColumns;

	constructor(public payload: any) { }
}

export class UpdateColumnsSuccess implements Action {
public readonly type = PricingActionTypes.UpdateColumnsSuccess;

constructor(public payload: any) { }
}

export class UpdateColumnsFail implements Action {
public readonly type = PricingActionTypes.UpdateColumnsFail;

constructor(public payload: any) { }
}

export type PricingActions =
	| SetCurrentPriceID
	| ClearCurrentPriceID
	| InitializeCurrentPriceID
	| LoadPricing
	| LoadPricingSuccess
	| LoadPricingFail
	| UpdatePrice
	| UpdatePriceSuccess
	| UpdatePriceFail
	| CreatePrice
	| CreatePriceSuccess
	| CreatePriceFail
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
