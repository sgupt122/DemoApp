import { ILeadType } from '@/_interfaces/lead-types';

export interface ICampaign {
	id?: number;
	provider_id?: number;
	name: string;
	code: string;
	lead_type?: ILeadType;
	lead_type_id?: number;
	billing_code: string;
	activated_date?: Date | null;
	active: number;
	provider?: IProvider;
	checked?: boolean;
}

interface IProvider {
	name: string;
	code: string;
	description: string;
	billing_code: string;
	active: number;
}
