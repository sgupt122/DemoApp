export interface INews {
	id?: number;
	title: string;
	content: string;
	category: number;
	order: number;
	active: number;
	user_id: number;
	activated_date?: string;
}
