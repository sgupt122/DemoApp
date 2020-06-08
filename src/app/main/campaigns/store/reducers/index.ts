import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CampaignsActions, CampaignsActionTypes } from '@/main/campaigns/store';
import { IApiSuccess, ICampaign, ILeadType, IProvider, IDatatableColumn } from '@/_interfaces';
import { IAppState } from '@/app.state';
import { COLUMNS } from '@/_config';

export interface CampaignsState extends IAppState {
	campaigns: ICampaignsState;
}

export interface ICampaignsState {
	currentCampaignID: number | null;
	campaigns: IApiSuccess<ICampaign[]>;
	error: string;
	providers: IApiSuccess<IProvider[]>;
	leadTypes: IApiSuccess<ILeadType[]>;
	loadColumns: IDatatableColumn[];
	updateColumns: any;
}

const initialCampaignsState: ICampaignsState = {
	currentCampaignID: null,
	campaigns: { data: [], meta: {} },
	error: '',
	providers: { data: [], meta: {} },
	leadTypes: { data: [], meta: {} },
	loadColumns: [],
	updateColumns: {
		user_id: 0,
		type: 'campaigns',
		json: []
	}
};
const getCampaignsFeatureState = createFeatureSelector<ICampaignsState>('campaigns');

export const getCurrentCampaignID = createSelector(
	getCampaignsFeatureState,
	state => state.currentCampaignID
);
export const getCurrentCampaign = createSelector(
	getCampaignsFeatureState,
	getCurrentCampaignID,
	(state, currentCampaignID) => {
		if (currentCampaignID === 0) {
			return {
				name: '',
				code: '',
				billing_code: '',
				activated_date: null,
				active: 0
			};
		}
		return currentCampaignID ? state.campaigns.data.find(c => c.id === currentCampaignID) : null;
	}
);
export const getCampaigns = createSelector(
	getCampaignsFeatureState,
	state => state.campaigns.data
);
export const getProviders = createSelector(
	getCampaignsFeatureState,
	state => state.providers.data
);
export const getLeadTypes = createSelector(
	getCampaignsFeatureState,
	state => state.leadTypes.data
);
export const getError = createSelector(
	getCampaignsFeatureState,
	state => state.error
);
export const getCampaignsColumns = createSelector(
	getCampaignsFeatureState,
	state => {
		return state.loadColumns
	}
);
export function reducer(state = initialCampaignsState, action: CampaignsActions): ICampaignsState {
	switch (action.type) {
		case CampaignsActionTypes.SetCurrentCampaignID:
			return {
				...state,
				currentCampaignID: action.payload.id
			};
		case CampaignsActionTypes.ClearCurrentCampaignID:
			return {
				...state,
				currentCampaignID: null
			};
		case CampaignsActionTypes.InitializeCurrentCampaignID:
			return {
				...state,
				currentCampaignID: 0
			};
		case CampaignsActionTypes.LoadCampaignsSuccess:
			return {
				...state,
				campaigns: action.payload,
				error: ''
			};
		case CampaignsActionTypes.LoadCampaignsFail:
			return {
				...state,
				campaigns: { data: [], meta: {} },
				error: action.payload
			};
		case CampaignsActionTypes.UpdateCampaignSuccess:
			const updatedCampaignsResponse = state.campaigns;
			const updatedCampaigns = state.campaigns.data.map(campaign =>
				action.payload.data.id === campaign.id ? action.payload.data : campaign
			);
			updatedCampaignsResponse.data = updatedCampaigns;
			return {
				...state,
				campaigns: updatedCampaignsResponse,
				currentCampaignID: action.payload.data.id,
				error: ''
			};
		case CampaignsActionTypes.UpdateCampaignFail:
			return {
				...state,
				error: action.payload
			};
		case CampaignsActionTypes.CreateCampaignSuccess:
			const createdCampaignsResponse = state.campaigns;
			const createdCampaigns = [...state.campaigns.data, action.payload.data];
			createdCampaignsResponse.data = createdCampaigns;
			return {
				...state,
				campaigns: createdCampaignsResponse,
				currentCampaignID: action.payload.data.id,
				error: ''
			};
		case CampaignsActionTypes.CreateCampaignFail:
			return {
				...state,
				error: action.payload
			};
		case CampaignsActionTypes.LoadProvidersSuccess:
			return {
				...state,
				providers: action.payload,
				error: ''
			};
		case CampaignsActionTypes.LoadProvidersFail:
			return {
				...state,
				providers: { data: [], meta: {} },
				error: action.payload
			};
		case CampaignsActionTypes.LoadLeadTypesSuccess:
			return {
				...state,
				leadTypes: action.payload,
				error: ''
			};
		case CampaignsActionTypes.LoadLeadTypesFail:
			return {
				...state,
				leadTypes: { data: [], meta: {} },
				error: action.payload
			};
			case CampaignsActionTypes.LoadColumnsSuccess:
				return {
					...state,
					loadColumns: action.payload.data.campaigns
			};

			case CampaignsActionTypes.LoadColumnsFail:
				return {
					...state,
					error: action.payload
			};

			case CampaignsActionTypes.UpdateColumnsSuccess:
				return {
					...state,
					loadColumns: COLUMNS.campaigns,
					updateColumns: action.payload
			};

			case CampaignsActionTypes.UpdateColumnsFail:
				return {
					...state,
					error: action.payload
				};
		default:
			return state;
	}
}
