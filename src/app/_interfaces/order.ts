import { ICampaign } from ".";

export interface IOrder {
	id?: number;
	user_id?: number;
	modifier_id?: number;
	order_type_id: number;
	description: string;
	timezone: string;
	month: number;
	day: number;
	hour: number;
	minute: number;
	status_id: number;
	lead_types: IOrderLeadType[];
	schedules: IOrderSchedule[];
	geos: IOrderGeo[];
	providers: IOrderProvider[];
	distributions: IOrderDistribution[];
	active: number;
	impersonateToken?: string;
}

export interface IOrderDistribution {
	order_distribution_type_id: number;
	recipient: string;
}

export interface IOrderProvider {
	code: string;
	campaign_code: string;
	lead_type_id: string;
	checked?: boolean;
	name?: string;
}

export interface IOrderSchedule {
	day: number;
	start: Date;
	end: Date;
}

export interface IOrderLeadType {
	lead_type_id: number;
	lead_types: ICampaign[];
	name: string;
	lead_type_name?: string;
}

export interface IOrderGeo {
	order_id: number;
	zip: string;
	latitude: number;
	longitude: number;
	city: string;
	state: string;
}

export interface IOrderType {
	id: number;
	name: string;
	icon: string;
	status_id: number;
}

export interface IOrderDistributionType {
	id: number;
	name: string;
}
