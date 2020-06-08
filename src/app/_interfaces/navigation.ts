export interface IRoleNavigation {
	admin: INavigation[];
	agent: INavigation[];
	auth: INavigation[];
}

export interface INavigation {
	id: string;
	title: string;
	type: string;
	icon: string;
	url?: string;
	exactMatch?: boolean;
	children?: IChild[];
}

interface IChild {
	id: string;
	title: string;
	type: string;
	url: string;
}
