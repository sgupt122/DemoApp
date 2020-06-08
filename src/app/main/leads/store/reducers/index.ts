import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LeadsActions, LeadsActionTypes } from '@/main/leads/store';
import { IApiSuccess, IClientDisposition, ILead, ILeadFilter, IDisputeReason, IDisputeLead, IDatatableColumn } from '@/_interfaces';
import { IAppState } from '@/app.state';
import { COLUMNS } from '@/_config';

export interface LeadsState extends IAppState {
	leads: ILeadsState;
}

export interface ILeadsState {
	currentLeadID: number | null;
	leads: IApiSuccess<ILead[]>;
	clientDispositions: IClientDisposition[];
	leadFilters: ILeadFilter;
	error: string;
	disputeReasons: IDisputeReason[];
	currentDisputeLead: IDisputeLead;
	leadsColumns: IDatatableColumn[];
	updateColumns: any;
}

const initialState: ILeadsState = {
	currentLeadID: null,
	leads: {
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
	clientDispositions: [],
	leadFilters: {
		leadID: '',
		firstName: '',
		lastName: '',
		email: '',
		status: '',
		providerID: '',
		campaignID: '',
		toDate: '',
		fromDate: '',
		page: 0,
		offset: 0
	},
	error: '',
	disputeReasons: [],
	currentDisputeLead: {
		leadIssue: '',
		lead_id: 0,
		reasonId: null
	},
	leadsColumns: [],
	updateColumns: {
		user_id: 0,
		type: 'prospect',
		json: []
	}
};
const getLeadsFeatureState = createFeatureSelector<ILeadsState>('leads');

export const getCurrentLeadID = createSelector(
	getLeadsFeatureState,
	state => state.currentLeadID
);
export const getCurrentLead = createSelector(
	getLeadsFeatureState,
	getCurrentLeadID,
	(state, currentLeadID) => {
		return currentLeadID ? state.leads.data.find(l => l.id === currentLeadID) : null;
	}
);
export const getLeadFilters = createSelector(
	getLeadsFeatureState,
	state => state.leadFilters
);
export const getLeads = createSelector(
	getLeadsFeatureState,
	state => state.leads
);
export const getClientDispositions = createSelector(
	getLeadsFeatureState,
	state => state.clientDispositions
);
export const getError = createSelector(
	getLeadsFeatureState,
	state => state.error
);

export const getCurrentLeadDataById = createSelector(
	getLeadsFeatureState,
	state => {
		return state.leads.data.filter((instance) => instance.id === state.currentLeadID);
	}
);

export const getDisputeReasons = createSelector(
	getLeadsFeatureState,
	state => state.disputeReasons
);

export const getCurrentDisputeLead = createSelector(
	getLeadsFeatureState,
	state => {
		if (state) {
			return state.currentDisputeLead
		} else { return null }
	}
)
export const getLeadColumns = createSelector(
	getLeadsFeatureState,
	state => {
		return state.leadsColumns
	}
);
// export const UpdateLeadColumns = createSelector(
// 	getLeadsFeatureState,
// 	state => {
// 		return state.UpdateColumns
// 	}
// );


export function reducer(state = initialState, action: LeadsActions): ILeadsState {
	switch (action.type) {
		case LeadsActionTypes.SetCurrentLeadID:
			return {
				...state,
				currentLeadID: action.payload.id
			};
		case LeadsActionTypes.ClearCurrentLeadID:
			return {
				...state,
				currentLeadID: null
			};
		case LeadsActionTypes.SetLeadFilters:
			return {
				...state,
				leadFilters: action.payload
			};
		case LeadsActionTypes.ResetLeadFilters:
			return {
				...state,
				leadFilters: {
					leadID: '',
					firstName: '',
					lastName: '',
					email: '',
					status: '',
					providerID: '',
					campaignID: '',
					toDate: '',
					fromDate: '',
					page: 0,
					offset: 0
				}
			};
		case LeadsActionTypes.LoadLeadsSuccess:
			return {
				...state,
				leads: action.payload,
				error: ''
			};
		case LeadsActionTypes.LoadLeadsFail:
			return {
				...state,
				leads: { data: [], meta: {} },
				error: action.payload
			};
		case LeadsActionTypes.UpdateLeadSuccess:
			const updatedLeadsResponse = state.leads;
			const updatedLeads = state.leads.data.map(lead =>
				action.payload.data.id === lead.id ? action.payload.data : lead
			);
			updatedLeadsResponse.data = updatedLeads;
			return {
				...state,
				leads: updatedLeadsResponse,
				currentLeadID: action.payload.data.id,
				error: ''
			};
		case LeadsActionTypes.UpdateLeadFail:
			return {
				...state,
				error: action.payload
			};
		case LeadsActionTypes.LoadClientDispositionsSuccess:
			return {
				...state,
				clientDispositions: action.payload.data
			};
		case LeadsActionTypes.LoadClientDispositionsFail:
			return {
				...state,
				clientDispositions: [],
				error: action.payload
			};
		case LeadsActionTypes.LoadDisputeReasonSuccess:
			return {
				...state,
				disputeReasons: action.payload.data
			}
		case LeadsActionTypes.LoadClientDispositionsFail:
			return {
				...state,
				disputeReasons: [],
				error: action.payload
			}
		case LeadsActionTypes.CreateDisputeLeadSuccess:
			return {
				...state
			}
		case LeadsActionTypes.GetCurrentDisputeLeadSuccess:
			if (action.payload) {
				return {
					...state,
					currentDisputeLead: action.payload.data
				}
			} else {
				return {
					...state,
					currentDisputeLead: {
						leadIssue: '',
						lead_id: 0,
						reasonId: null
					},
				}
			}

		case LeadsActionTypes.GetCurrentDisputeLeadFail:
			return {
				...state,
				currentDisputeLead: {
					leadIssue: '',
					lead_id: 0,
					reasonId: null
				},
				error: action.payload
			}

			case LeadsActionTypes.LoadColumnsSuccess:
				return {
					...state,
					leadsColumns: action.payload.data.prospect
			}

			case LeadsActionTypes.LoadColumnsFail:
				return {
					...state,
					error: action.payload
			}

			case LeadsActionTypes.UpdateColumnsSuccess:
				return {
					...state,
					leadsColumns: COLUMNS.leads,
					updateColumns: action.payload
			}

			case LeadsActionTypes.UpdateColumnsFail:
				return {
					...state,
					error: action.payload
				};

		default:
			return state;
	}
}
