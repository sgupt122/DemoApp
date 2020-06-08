import { Action } from '@ngrx/store';

import { IApiSuccess, IClientDisposition, ILead, ILeadFilter, IDisputeReason, IDisputeLead } from '@/_interfaces';

export enum LeadsActionTypes {
	SetCurrentLeadID = '[Leads] Set Current Lead ID',
	ClearCurrentLeadID = '[Leads] Clear Current Lead ID',
	SetLeadFilters = '[Leads] Set Lead Filters',
	ResetLeadFilters = '[Leads] Reset Lead Filters',
	LoadLeads = '[Leads] Leads Load',
	LoadLeadsSuccess = '[Leads] Load Leads Success',
	LoadLeadsFail = '[Leads] Load Leads Fail',
	UpdateLead = '[Leads] Update Lead',
	UpdateLeadSuccess = '[Leads] Update Lead Success',
	UpdateLeadFail = '[Leads] Update Lead Fail',
	LoadClientDispositions = '[Leads] Load Client Dispositions',
	LoadClientDispositionsSuccess = '[Leads] Load Client Dispositions Success',
	LoadClientDispositionsFail = '[Leads] Load Client Dispositions Fail',
	LoadDisputeReason = '[Leads] Load Dispute Reason',
	LoadDisputeReasonSuccess = '[Leads] Load Dispute Reason Success',
	LoadDisputeReasonFail = '[Leads] Load Dispute Reason Fail',
	CreateDisputeLead = '[Leads] Create Dispute Lead',
	CreateDisputeLeadSuccess = '[Leads] Create Dispute Lead Success',
	CreateDisputeLeadFail = '[Leads] Create Dispute Lead Fail',
	GetCurrentDisputeLead = '[Leads] Get Dispute Lead',
	GetCurrentDisputeLeadSuccess = '[Leads] Get Dispute Lead Success',
	GetCurrentDisputeLeadFail = '[Leads] Get Dispute Lead Fail',
	LoadColumns = '[Leads] Load Columns',
	LoadColumnsSuccess = '[Leads] Load Columns Success',
	LoadColumnsFail = '[Leads] Load Columns Fail',
	UpdateColumns = '[Leads] Update Columns',
	UpdateColumnsSuccess = '[Leads] Update Columns Success',
	UpdateColumnsFail = '[Leads] Update Columns Fail',
}
export class SetCurrentLeadID implements Action {
	public readonly type = LeadsActionTypes.SetCurrentLeadID;

	constructor(public payload: ILead) { }
}

export class ClearCurrentLeadID implements Action {
	public readonly type = LeadsActionTypes.ClearCurrentLeadID;
}

export class SetLeadFilters implements Action {
	public readonly type = LeadsActionTypes.SetLeadFilters;

	constructor(public payload: ILeadFilter) { }
}

export class ResetLeadFilters implements Action {
	public readonly type = LeadsActionTypes.ResetLeadFilters;
}

export class LoadLeads implements Action {
	public readonly type = LeadsActionTypes.LoadLeads;

	constructor(public payload: ILeadFilter) { }
}

export class LoadLeadsSuccess implements Action {
	public readonly type = LeadsActionTypes.LoadLeadsSuccess;

	constructor(public payload: IApiSuccess<ILead[]>) { }
}

export class LoadLeadsFail implements Action {
	public readonly type = LeadsActionTypes.LoadLeadsFail;

	constructor(public payload: string) { }
}

export class UpdateLead implements Action {
	public readonly type = LeadsActionTypes.UpdateLead;

	constructor(public payload: ILead) { }
}

export class UpdateLeadSuccess implements Action {
	public readonly type = LeadsActionTypes.UpdateLeadSuccess;

	constructor(public payload: IApiSuccess<ILead>) { }
}

export class UpdateLeadFail implements Action {
	public readonly type = LeadsActionTypes.UpdateLeadFail;

	constructor(public payload: string) { }
}

export class LoadClientDispositions implements Action {
	public readonly type = LeadsActionTypes.LoadClientDispositions;
}

export class LoadClientDispositionsSuccess implements Action {
	public readonly type = LeadsActionTypes.LoadClientDispositionsSuccess;

	constructor(public payload: IApiSuccess<IClientDisposition[]>) { }
}

export class LoadClientDispositionsFail implements Action {
	public readonly type = LeadsActionTypes.LoadClientDispositionsFail;

	constructor(public payload: string) { }
}

export class LoadDisputeReason implements Action {
	public readonly type = LeadsActionTypes.LoadDisputeReason;
}

export class LoadDisputeReasonSuccess implements Action {
	public readonly type = LeadsActionTypes.LoadDisputeReasonSuccess;

	constructor(public payload: IApiSuccess<IDisputeReason[]>) {
	}
}

export class LoadDisputeReasonFail implements Action {
	public readonly type = LeadsActionTypes.LoadDisputeReasonFail;

	constructor(public payload: string) { }
}

export class CreateDisputeLead implements Action {
	public readonly type = LeadsActionTypes.CreateDisputeLead;

	constructor(public payload: IDisputeLead) { }
}

export class CreateDisputeLeadSuccess implements Action {
	public readonly type = LeadsActionTypes.CreateDisputeLeadSuccess;

	constructor(public payload: IApiSuccess<IDisputeLead>) { }
}
export class CreateDisputeLeadFail implements Action {
	public readonly type = LeadsActionTypes.CreateDisputeLeadFail;

	constructor(public payload: string) { }
}

export class GetCurrentDisputeLead implements Action {
	public readonly type = LeadsActionTypes.GetCurrentDisputeLead;

	constructor(public payload: any) {
	}
}
export class GetCurrentDisputeLeadSuccess implements Action {
	public readonly type = LeadsActionTypes.GetCurrentDisputeLeadSuccess;

	constructor(public payload: IApiSuccess<IDisputeLead>) {
	}
}
export class GetCurrentDisputeLeadFail implements Action {
	public readonly type = LeadsActionTypes.GetCurrentDisputeLeadFail;

	constructor(public payload: string) { }
}
// for load column
export class LoadColumns implements Action {
	public readonly type = LeadsActionTypes.LoadColumns;
}

export class LoadColumnsSuccess implements Action {
public readonly type = LeadsActionTypes.LoadColumnsSuccess;

constructor(public payload: any) { }
}

export class LoadColumnsFail implements Action {
public readonly type = LeadsActionTypes.LoadColumnsFail;

constructor(public payload: any) { }
}

export class UpdateColumns implements Action {
	public readonly type = LeadsActionTypes.UpdateColumns;

	constructor(public payload: any) { }
}

export class UpdateColumnsSuccess implements Action {
public readonly type = LeadsActionTypes.UpdateColumnsSuccess;

constructor(public payload: any) { }
}

export class UpdateColumnsFail implements Action {
public readonly type = LeadsActionTypes.UpdateColumnsFail;

constructor(public payload: any) { }
}

export type LeadsActions =
	| SetCurrentLeadID
	| ClearCurrentLeadID
	| SetLeadFilters
	| ResetLeadFilters
	| LoadLeads
	| LoadLeadsSuccess
	| LoadLeadsFail
	| UpdateLead
	| UpdateLeadSuccess
	| UpdateLeadFail
	| LoadClientDispositions
	| LoadClientDispositionsSuccess
	| LoadClientDispositionsFail
	| LoadDisputeReason
	| LoadDisputeReasonSuccess
	| LoadDisputeReasonFail
	| CreateDisputeLead
	| CreateDisputeLeadSuccess
	| CreateDisputeLeadFail
	| GetCurrentDisputeLead
	| GetCurrentDisputeLeadSuccess
	| GetCurrentDisputeLeadFail
	| LoadColumns
	| LoadColumnsSuccess
	| LoadColumnsFail
	| UpdateColumns
	| UpdateColumnsSuccess
	| UpdateColumnsFail;
