import { Action } from '@ngrx/store';

import { IApiSuccess, IUser, IUserFilter } from '@/_interfaces';

export enum AgentsActionTypes {
	SetCurrentAgentID = '[Agents] Set Current Agent ID',
	ClearCurrentAgentID = '[Agents] Clear Current Agent ID',
	InitializeCurrentAgentID = '[Agents] Initialized Current Agent ID',
	SetAgentFilters = '[Agents] Set Agent Filters',
	ResetAgentFilters = '[Agents] Reset Agent Filters',
	LoadAgents = '[Agents] Agents Load',
	LoadAgentsSuccess = '[Agents] Load Agents Success',
	LoadAgentsFail = '[Agents] Load Agents Fail',
	UpdateAgent = '[Agents] Update Agent',
	UpdateAgentSuccess = '[Agents] Update Agent Success',
	UpdateAgentFail = '[Agents] Update Agent Fail',
	CreateAgent = '[Agents] Create Agent',
	CreateAgentSuccess = '[Agents] Create Agent Success',
	CreateAgentFail = '[Agents] Create Agent Fail',
	LoadColumns = '[Agents] Load Columns',
	LoadColumnsSuccess = '[Agents] Load Columns Success',
	LoadColumnsFail = '[Agents] Load Columns Fail',
	UpdateColumns = '[Agents] Update Columns',
	UpdateColumnsSuccess = '[Agents] Update Columns Success',
	UpdateColumnsFail = '[Agents] Update Columns Fail'
}
export class SetCurrentAgentID implements Action {
	public readonly type = AgentsActionTypes.SetCurrentAgentID;

	constructor(public payload: IUser) {}
}

export class ClearCurrentAgentID implements Action {
	public readonly type = AgentsActionTypes.ClearCurrentAgentID;
}

export class InitializeCurrentAgentID implements Action {
	public readonly type = AgentsActionTypes.InitializeCurrentAgentID;
}

export class SetAgentFilters implements Action {
	public readonly type = AgentsActionTypes.SetAgentFilters;

	constructor(public payload: IUserFilter) {}
}

export class ResetAgentFilters implements Action {
	public readonly type = AgentsActionTypes.ResetAgentFilters;
}

export class LoadAgents implements Action {
	public readonly type = AgentsActionTypes.LoadAgents;

	constructor(public payload: IUserFilter) {}
}

export class LoadAgentsSuccess implements Action {
	public readonly type = AgentsActionTypes.LoadAgentsSuccess;

	constructor(public payload: IApiSuccess<IUser[]>) {}
}

export class LoadAgentsFail implements Action {
	public readonly type = AgentsActionTypes.LoadAgentsFail;

	constructor(public payload: string) {}
}

export class UpdateAgent implements Action {
	public readonly type = AgentsActionTypes.UpdateAgent;

	constructor(public payload: IUser) {}
}

export class UpdateAgentSuccess implements Action {
	public readonly type = AgentsActionTypes.UpdateAgentSuccess;

	constructor(public payload: IApiSuccess<IUser>) {}
}

export class UpdateAgentFail implements Action {
	public readonly type = AgentsActionTypes.UpdateAgentFail;

	constructor(public payload: string) {}
}

export class CreateAgent implements Action {
	public readonly type = AgentsActionTypes.CreateAgent;

	constructor(public payload: IUser) {}
}

export class CreateAgentSuccess implements Action {
	public readonly type = AgentsActionTypes.CreateAgentSuccess;

	constructor(public payload: IApiSuccess<IUser>) {}
}

export class CreateAgentFail implements Action {
	public readonly type = AgentsActionTypes.CreateAgentFail;

	constructor(public payload: string) {}
}

export class LoadColumns implements Action {
	public readonly type = AgentsActionTypes.LoadColumns;
}

export class LoadColumnsSuccess implements Action {
public readonly type = AgentsActionTypes.LoadColumnsSuccess;

constructor(public payload: any) { }
}

export class LoadColumnsFail implements Action {
public readonly type = AgentsActionTypes.LoadColumnsFail;

constructor(public payload: any) { }
}

export class UpdateColumns implements Action {
	public readonly type = AgentsActionTypes.UpdateColumns;

	constructor(public payload: any) { }
}

export class UpdateColumnsSuccess implements Action {
public readonly type = AgentsActionTypes.UpdateColumnsSuccess;

constructor(public payload: any) { }
}

export class UpdateColumnsFail implements Action {
public readonly type = AgentsActionTypes.UpdateColumnsFail;

constructor(public payload: any) { }
}

export type AgentsActions =
	| SetCurrentAgentID
	| ClearCurrentAgentID
	| InitializeCurrentAgentID
	| SetAgentFilters
	| ResetAgentFilters
	| LoadAgents
	| LoadAgentsSuccess
	| LoadAgentsFail
	| UpdateAgent
	| UpdateAgentSuccess
	| UpdateAgentFail
	| CreateAgent
	| CreateAgentSuccess
	| CreateAgentFail
	| LoadColumns
	| LoadColumnsSuccess
	| LoadColumnsFail
	| UpdateColumns
	| UpdateColumnsSuccess
	| UpdateColumnsFail;
