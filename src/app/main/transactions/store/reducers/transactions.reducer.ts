import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TransactionsActions, TransactionsActionTypes } from '@/main/transactions/store';
import { IApiSuccess, ITransaction, ITransactionsFilter, IDatatableColumn } from '@/_interfaces';
import { IAppState } from '@/app.state';
import { COLUMNS } from '@/_config';

export interface TransactionsState extends IAppState {
	transactions: ITransactionsState;
}

export interface ITransactionsState {
	transactions: IApiSuccess<ITransaction[]>;
	filters: ITransactionsFilter;
	error: string;
	loadColumns: IDatatableColumn[];
	updateColumns: any;
}

const initialState: ITransactionsState = {
	transactions: {
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
	filters: {
		userID: '',
		amount: '',
		balance: '',
		page: 0
	},
	error: '',
	loadColumns: [],
	updateColumns: {
		user_id: 0,
		type: 'account',
		json: []
	}
};
const getTransactionsFeatureState = createFeatureSelector<ITransactionsState>('transactions');

export const getTransactionsFilters = createSelector(
	getTransactionsFeatureState,
	state => state.filters
);
export const getTransactions = createSelector(
	getTransactionsFeatureState,
	state => state.transactions
);
export const getError = createSelector(
	getTransactionsFeatureState,
	state => state.error
);
export const getTransactionColumns = createSelector(
	getTransactionsFeatureState,
	state =>  state.loadColumns
);
export function reducer(state = initialState, action: TransactionsActions): ITransactionsState {
	switch (action.type) {
		case TransactionsActionTypes.SetTransactionsFilters:
			return {
				...state,
				filters: action.payload
			};
		case TransactionsActionTypes.ResetTransactionsFilters:
			return {
				...state,
				filters: {
					userID: null,
					amount: '',
					balance: '',
					page: 0
				}
			};
		case TransactionsActionTypes.LoadSuccess:
			return {
				...state,
				transactions: action.payload,
				error: ''
			};
		case TransactionsActionTypes.LoadFail:
			return {
				...state,
				transactions: { data: [], meta: {} },
				error: action.payload
			};

			case TransactionsActionTypes.LoadColumnsSuccess:
				return {
					...state,
					loadColumns: action.payload.data.account
			}

			case TransactionsActionTypes.LoadColumnsFail:
				return {
					...state,
					error: action.payload
			}

			case TransactionsActionTypes.UpdateColumnsSuccess:
				return {
					...state,
					loadColumns: COLUMNS.transactions,
					updateColumns: action.payload
			}

			case TransactionsActionTypes.UpdateColumnsFail:
				return {
					...state,
					error: action.payload
				};

		default:
			return state;
	}
}
