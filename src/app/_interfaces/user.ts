export interface IUser {
	id?: number;
	user_id?: number;
	email: string;
	roles: string[];
	profile: Profile;
	impersonateToken?: string;
}

interface Profile {
	first_name: string;
	last_name: string;
	address: string;
	address_2: string;
	phone: string;
	business_phone: string;
	postal_code: string;
	city: string;
	state: string;
	county: string;
	country: string;
	timezone: string;
	birthdate: string;
}

export interface IUserFilter {
	userID: string;
	firstName: string;
	lastName: string;
	email: string;
	page: number;
}
