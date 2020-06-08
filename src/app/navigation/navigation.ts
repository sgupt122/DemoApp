import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		type: 'item',
		icon: 'home',
		url: '/dashboard',
		exactMatch: true
	},
	{
		id: 'news',
		title: 'News',
		type: 'item',
		icon: 'calendar_view_day',
		url: '/news'
	},
	{
		id: 'agents',
		title: 'Agents',
		type: 'item',
		icon: 'people',
		url: '/agents'
	},
	{
		id: 'providers',
		title: 'Providers',
		type: 'item',
		icon: 'local_parking',
		url: '/providers'
	},
	{
		id: 'campaigns',
		title: 'Campaigns',
		type: 'item',
		icon: 'ballot',
		url: '/campaigns'
	},
	{
		id: 'leads',
		title: 'Leads',
		type: 'item',
		icon: 'person',
		url: '/leads'
	},
	{
		id: 'customers',
		title: 'Customers',
		type: 'item',
		icon: 'person',
		url: '/customers'
	},
	{
		id: 'faqs',
		title: 'FAQs',
		type: 'item',
		icon: 'feedback',
		url: '/faq'
	},
	{
		id: 'orders',
		title: 'Orders',
		type: 'collapsable',
		icon: 'layers',
		children: [
			{
				id: 'manage',
				title: 'Manage',
				type: 'item',
				url: '/orders/manage'
			},
			{
				id: 'place',
				title: 'Place',
				type: 'item',
				url: '/orders/place'
			}
		]
	},
	{
		id: 'transactions',
		title: 'Transactions',
		type: 'item',
		icon: 'monetization_on',
		url: '/transactions'
	}
];
