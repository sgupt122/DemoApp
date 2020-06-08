import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CustomersActions, CustomersActionTypes } from '@/main/customers/store';
import { IApiSuccess, ICustomer, ICustomerFilter, IDatatableColumn } from '@/_interfaces';
import { IAppState } from '@/app.state';
import { COLUMNS } from '@/_config';

export interface CustomersState extends IAppState {
	customers: ICustomersState;
}

export interface ICustomersState {
	currentCustomerID: number | null;
	customers: IApiSuccess<ICustomer[]>;
	customerFilters: ICustomerFilter;
	error: string;
	loadColumns: IDatatableColumn[];
	updateColumns: any;
}

const initialState: ICustomersState = {
	currentCustomerID: null,
	customers: {
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
	customerFilters: {
		customerID: '',
		firstName: '',
		lastName: '',
		email: '',
		status: '',
		providerID: '',
		leadID: '',
		page: 0,
		offset: 0
	},
	error: '',
	loadColumns: [],
	updateColumns: {
		user_id: 0,
		type: 'customer',
		json: []
	}
};
const getCustomersFeatureState = createFeatureSelector<ICustomersState>('customers');

export const getCurrentCustomerID = createSelector(
	getCustomersFeatureState,
	state => state.currentCustomerID
);
export const getCurrentCustomer = createSelector(
	getCustomersFeatureState,
	getCurrentCustomerID,
	(state, currentCustomerID) => {
		return currentCustomerID ? state.customers.data.find(l => l.id === currentCustomerID) : null;
	}
);
export const getCustomerFilters = createSelector(
	getCustomersFeatureState,
	state => state.customerFilters
);
export const getCustomers = createSelector(
	getCustomersFeatureState,
	state => state.customers
);
export const getError = createSelector(
	getCustomersFeatureState,
	state => state.error
);
export const getCustomerDataById = createSelector(
	getCustomersFeatureState,
	state => {
		return state.customers.data.filter((instance) => instance.id === state.currentCustomerID);
	}
);

export const getCustomerColumns = createSelector(
	getCustomersFeatureState,
	state => {
		return state.loadColumns
	}
);

export function reducer(state = initialState, action: CustomersActions): ICustomersState {
	switch (action.type) {
		case CustomersActionTypes.SetCurrentCustomerID:
			return {
				...state,
				currentCustomerID: action.payload.id
			};
		case CustomersActionTypes.ClearCurrentCustomerID:
			return {
				...state,
				currentCustomerID: null
			};
		case CustomersActionTypes.SetCustomerFilters:
			return {
				...state,
				customerFilters: action.payload
			};
		case CustomersActionTypes.ResetCustomerFilters:
			return {
				...state,
				customerFilters: {
					customerID: '',
					firstName: '',
					lastName: '',
					email: '',
					status: '',
					providerID: '',
					leadID: '',
					page: 0,
					offset: 0
				}
			};
		case CustomersActionTypes.LoadCustomersSuccess:
			return {
				...state,
				customers: action.payload,
				error: ''
			};
		case CustomersActionTypes.LoadCustomersFail:
			return {
				...state,
				customers: { data: [], meta: {} },
				error: action.payload
			};
		case CustomersActionTypes.UpdateCustomerSuccess:
			const updatedLeadsResponse = state.customers;
			const updatedLeads = state.customers.data.map(lead =>
				action.payload.data.id === lead.id ? action.payload.data : lead
			);
			updatedLeadsResponse.data = updatedLeads;
			return {
				...state,
				customers: updatedLeadsResponse,
				currentCustomerID: action.payload.data.id,
				error: ''
			};
		case CustomersActionTypes.UpdateCustomerFail:
			return {
				...state,
				error: action.payload
			};
			case CustomersActionTypes.LoadColumnsSuccess:
				return {
					...state,
					loadColumns: action.payload.data.customer
			}

			case CustomersActionTypes.LoadColumnsFail:
				return {
					...state,
					error: action.payload
			}

			case CustomersActionTypes.UpdateColumnsSuccess:
				return {
					...state,
					loadColumns: COLUMNS.customers,
					updateColumns: action.payload
			}

			case CustomersActionTypes.UpdateColumnsFail:
				return {
					...state,
					error: action.payload
				};
		default:
			return state;
	}
}
