export interface IUserTextingPreferences {
	data: ITextingPreferences | null;
}

export interface ITextingPreferences {
	sunday_start_time: string | null;
	sunday_end_time: string | null;
	monday_start_time: string | null;
	monday_end_time: string | null;
	tuesday_start_time: string | null;
	tuesday_end_time: string | null;
	wednesday_start_time: string | null;
	wednesday_end_time: string | null;
	thursday_start_time: string | null;
	thursday_end_time: string | null;
	friday_start_time: string | null;
	friday_end_time: string | null;
	saturday_start_time: string | null;
	saturday_end_time: string | null;
	user_id?: number;
	impersonateToken?: string;
}
