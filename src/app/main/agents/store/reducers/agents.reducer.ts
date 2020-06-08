import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AgentsActions, AgentsActionTypes } from '@/main/agents/store';
import { IApiSuccess, IUser, IUserFilter, IDatatableColumn } from '@/_interfaces';
import { IAppState } from '@/app.state';
import { COLUMNS } from '@/_config';

export interface AgentsState extends IAppState {
	agents: IAgentsState;
}

export interface IAgentsState {
	currentAgentID: number | null;
	agents: IApiSuccess<IUser[]>;
	agentFilters: IUserFilter;
	error: string;
	loadColumns: IDatatableColumn[];
	updateColumns: any;
}

const initialAgentState: IAgentsState = {
	currentAgentID: null,
	agents: {
		data: [],
		meta: {
			pagination: {
				total: 0,
				count: 10,
				per_page: 10,
				current_page: 1,
				total_pages: 0
			}
		}
	},
	agentFilters: {
		userID: '',
		firstName: '',
		lastName: '',
		email: '',
		page: 0
	},
	error: '',
	loadColumns: [],
	updateColumns: {
		user_id: 0,
		type: 'agents',
		json: []
	}
};
const getAgentFeatureState = createFeatureSelector<IAgentsState>('agents');

export const getCurrentAgentID = createSelector(
	getAgentFeatureState,
	state => state.currentAgentID
);
export const getCurrentAgent = createSelector(
	getAgentFeatureState,
	getCurrentAgentID,
	(state, currentAgentID) => {
		if (currentAgentID === 0) {
			return {
				email: '',
				roles: [''],
				profile: {
					first_name: '',
					last_name: '',
					address: '',
					address_2: '',
					phone: '',
					business_phone: '',
					postal_code: '',
					city: '',
					state: '',
					county: '',
					country: '',
					timezone: '',
					birthdate: ''
				}
			};
		}
		return currentAgentID ? state.agents.data.find(p => p.id === currentAgentID) : null;
	}
);
export const getAgents = createSelector(
	getAgentFeatureState,
	state => state.agents
);
export const getAgentFilters = createSelector(
	getAgentFeatureState,
	state => state.agentFilters
);
export const getError = createSelector(
	getAgentFeatureState,
	state => state.error
);
export const getAgentColumns = createSelector(
	getAgentFeatureState,
	state => {
		return state.loadColumns
	}
);

export function reducer(state = initialAgentState, action: AgentsActions): IAgentsState {
	switch (action.type) {
		case AgentsActionTypes.SetCurrentAgentID:
			return {
				...state,
				currentAgentID: action.payload.id
			};
		case AgentsActionTypes.ClearCurrentAgentID:
			return {
				...state,
				currentAgentID: null
			};
		case AgentsActionTypes.InitializeCurrentAgentID:
			return {
				...state,
				currentAgentID: 0
			};
		case AgentsActionTypes.SetAgentFilters:
			return {
				...state,
				agentFilters: action.payload
			};
		case AgentsActionTypes.ResetAgentFilters:
			return {
				...state,
				agentFilters: {
					userID: '',
					firstName: '',
					lastName: '',
					email: '',
					page: 0
				}
			};
		case AgentsActionTypes.LoadAgentsSuccess:
			return {
				...state,
				agents: action.payload,
				error: ''
			};
		case AgentsActionTypes.LoadAgentsFail:
			return {
				...state,
				agents: { data: [], meta: {} },
				error: action.payload
			};
		case AgentsActionTypes.UpdateAgentSuccess:
			const updatedAgentsResponse = state.agents;
			const updatedAgents = state.agents.data.map(provider =>
				action.payload.data.id === provider.id ? action.payload.data : provider
			);
			updatedAgentsResponse.data = updatedAgents;
			return {
				...state,
				agents: updatedAgentsResponse,
				currentAgentID: action.payload.data.id,
				error: ''
			};
		case AgentsActionTypes.UpdateAgentFail:
			return {
				...state,
				error: action.payload
			};
		case AgentsActionTypes.CreateAgentSuccess:
			const createdAgentsResponse = state.agents;
			const createdAgents = [...state.agents.data, action.payload.data];
			createdAgentsResponse.data = createdAgents;
			return {
				...state,
				agents: createdAgentsResponse,
				currentAgentID: action.payload.data.id,
				error: ''
			};
		case AgentsActionTypes.CreateAgentFail:
			return {
				...state,
				error: action.payload
			};
		
			case AgentsActionTypes.LoadColumnsSuccess:
				return {
					...state,
					loadColumns: action.payload.data.agents
			};

			case AgentsActionTypes.LoadColumnsFail:
				return {
					...state,
					error: action.payload
			};

			case AgentsActionTypes.UpdateColumnsSuccess:
				return {
					...state,
					loadColumns: COLUMNS.agents,
					updateColumns: action.payload
			};

			case AgentsActionTypes.UpdateColumnsFail:
				return {
					...state,
					error: action.payload
				};
		default:
			return state;
	}
}
