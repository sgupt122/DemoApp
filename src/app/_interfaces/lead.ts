export interface ILead {
	id: number;
	preping_id?: any;
	ping_id?: any;
	user: User;
	order_id: number;
	provider: Source;
	campaign: Source;
	status: number;
	client_disposition_id?: number | null;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	address: string;
	postal_code: string;
	city: string;
	state: string;
	end_date_time: string;
	start_date_time: string;
	location?: string,
	notes?: string,
	title?: string
}

interface Source {
	id: number;
	name: string;
	code: string;
}

interface User {
	id: number;
	email: string;
}

export interface ILeadFilter {
	leadID: string;
	firstName: string;
	lastName: string;
	email: string;
	status: string;
	providerID: string;
	campaignID: string;
	toDate: Date | string;
	fromDate: Date | string;
	page: number;
	offset: number
}

export interface IClientDisposition {
	id: number;
	name: string;
	status: number;
}

export interface IDispositionParams {
	user_id: number;
	client_disposition_id: number;
}

export interface IDisputeReason {
	id: number,
	reason: string;
}

export interface IDisputeLead {
	lead_id: number,
	leadIssue: string,
	reasonId: number
}

export interface IStatus {
	class: string,
	created_at?: any,
	icon: string,
	name: string
	statusId: number
	updated_at?: any
}