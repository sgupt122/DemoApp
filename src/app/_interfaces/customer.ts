export interface ICustomer {
	id: number;
	preping_id?: any;
	ping_id?: any;
	user: User;
	order_id: number;
	provider: Source;
	campaign: Source;
	status: number;
	first_name: string;
	last_name: string;
	email: string;
	phone: string;
	address: string;
	postal_code: string;
	city: string;
	state: string;
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

export interface ICustomerFilter {
	customerID: string;
	firstName: string;
	lastName: string;
	email: string;
	status: string;
	providerID: string;
	leadID: string;
	page: number;
	offset: number;
}
