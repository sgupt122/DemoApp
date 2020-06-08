import { ICreatedAt } from '@/_interfaces/created-at';

export interface ITransaction {
	id: number;
	user_id: number;
	description: string;
	subsidy: number;
	amount: string;
	balance: string;
	created_at: ICreatedAt;
}

export interface ITransactionsFilter {
	userID: string;
	amount: string;
	balance: string;
	page: number;
}
