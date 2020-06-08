import { ICampaign } from '@/_interfaces/';

export interface IProvider {
	id?: number;
	name: string;
	code: string;
	description: string;
	active: number;
	campaigns?: ICampaign[];
}

export interface IProviderFormErrors {
	name?: string[];
	code?: string[];
	description?: string[];
}
