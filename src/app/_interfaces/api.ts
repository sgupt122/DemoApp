import { IMeta } from '@/_interfaces/meta';

export interface IApiGeneric {
	message: string;
	data?: any;
	status_code: number;
}

export interface IApiError {
	message: string;
	errors: any[];
	status_code: number;
}

export interface IApiSuccess<T> {
	data: T;
	meta?: IMeta;
}
