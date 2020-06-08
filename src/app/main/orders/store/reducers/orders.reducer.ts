import { createFeatureSelector, createSelector } from '@ngrx/store';

import { OrdersActions, OrdersActionTypes } from '@/main/orders/store';
import { IApiSuccess, IOrder, IDatatableColumn } from '@/_interfaces';
import { IAppState } from '@/app.state';
import { COLUMNS } from '@/_config';

export interface OrdersState extends IAppState {
	orders: IOrdersState;
}

export interface IOrdersState {
	currentOrderID: number | null;
	selectedOrderTypeID: number;
	orders: IApiSuccess<IOrder[]>;
	error: any | null;
	loadColumns: IDatatableColumn[];
	updateColumns: any;
}

const initialState: IOrdersState = {
	currentOrderID: null,
	selectedOrderTypeID: null,
	orders: { data: [], meta: {} },
	error: null,
	loadColumns: [],
	updateColumns: {
		user_id: 0,
		type: 'orders',
		json: []
	}
};
const getOrdersFeatureState = createFeatureSelector<IOrdersState>('orders');

export const getCurrentOrderID = createSelector(
	getOrdersFeatureState,
	state => state.currentOrderID
);
export const getCurrentOrderTypeID = createSelector(
	getOrdersFeatureState,
	state => state.selectedOrderTypeID
);
export const getCurrentOrder = createSelector(
	getOrdersFeatureState,
	getCurrentOrderID,
	getCurrentOrderTypeID,
	(state, currentOrderID, currentOrderTypeID) => {
		if (currentOrderID === 0) {
			return {
				order_type_id: currentOrderTypeID,
				description: '',
				timezone: '',
				month: null,
				day: null,
				hour: null,
				minute: null,
				status_id: 1,
				lead_types: [],
				schedules: [],
				geos: [],
				providers: [],
				distributions: [],
				active: 1
			};
		}
		return currentOrderID ? state.orders.data.find(p => p.id === currentOrderID) : null;
	}
);
export const getOrders = createSelector(
	getOrdersFeatureState,
	state => state.orders.data
);
export const getError = createSelector(
	getOrdersFeatureState,
	state => state.error
);

export const getOrderDataById = createSelector(
	getOrdersFeatureState,
	state => {
		return state.orders.data.filter((instance) => instance.id === state.currentOrderID);
	}
);

export const getOrderColumns = createSelector(
	getOrdersFeatureState,
	state => {
		return state.loadColumns
	}
);

export function reducer(state = initialState, action: OrdersActions): IOrdersState {
	switch (action.type) {
		case OrdersActionTypes.SetCurrentOrderID:
			return {
				...state,
				currentOrderID: action.payload.id
			};
		case OrdersActionTypes.ClearCurrentOrderID:
			return {
				...state,
				currentOrderID: null
			};
		case OrdersActionTypes.InitializeCurrentOrderID:
			return {
				...state,
				currentOrderID: 0
			};
		case OrdersActionTypes.InitializeOrderTypeID:
			return {
				...state,
				selectedOrderTypeID: action.payload
			};
		case OrdersActionTypes.LoadSuccess:
			return {
				...state,
				orders: action.payload,
				error: null
			};
		case OrdersActionTypes.LoadFail:
			return {
				...state,
				orders: { data: [], meta: {} },
				error: action.payload
			};
		case OrdersActionTypes.UpdateOrderSuccess:
			const updatedOrdersResponse = state.orders;
			const updatedOrders = state.orders.data.map(order =>
				action.payload.data.id === order.id ? action.payload.data : order
			);
			updatedOrdersResponse.data = updatedOrders;
			return {
				...state,
				orders: updatedOrdersResponse,
				currentOrderID: action.payload.data.id,
				error: null
			};
		case OrdersActionTypes.UpdateOrderFail:
			return {
				...state,
				error: action.payload
			};
		case OrdersActionTypes.CreateOrderSuccess:
			const createdOrdersResponse = state.orders;
			const createdOrders = [...state.orders.data, action.payload.data];
			createdOrdersResponse.data = createdOrders;
			return {
				...state,
				orders: createdOrdersResponse,
				currentOrderID: action.payload.data.id,
				error: null
			};
		case OrdersActionTypes.CreateOrderFail:
			return {
				...state,
				error: action.payload
			};
		
			case OrdersActionTypes.LoadColumnsSuccess:
				return {
					...state,
					loadColumns: action.payload.data.orders
			}

			case OrdersActionTypes.LoadColumnsFail:
				return {
					...state,
					error: action.payload
			}

			case OrdersActionTypes.UpdateColumnsSuccess:
				return {
					...state,
					loadColumns: COLUMNS.orders,
					updateColumns: action.payload
			}

			case OrdersActionTypes.UpdateColumnsFail:
				return {
					...state,
					error: action.payload
				};

		default:
			return state;
	}
}
