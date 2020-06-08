import { IRoleNavigation } from '@/_interfaces';

export const NAVIGATION: IRoleNavigation = {
	admin: [
		{
			id: 'dashboard',
			title: 'Dashboard',
			type: 'item',
			icon: '',
			url: '/dashboard',
			exactMatch: true
		},
		{
			id: 'leads',
			title: 'Prospects',
			type: 'item',
			icon: '',
			url: '/leads'
		},
		{
			id: 'orders',
			title: 'Orders',
			type: 'collapsable',
			icon: '',
			url: '/orders'
		},
		{
			id: 'account',
			title: 'Account',
			type: 'collapsable',
			icon: '',
			url: '/transactions'

			//children: [
			//	{
			//		id: 'billing',
			//		title: 'Billing',
			//		type: 'item',
			//		url: '/details'
			//	},
			//	{
			//		id: 'summary',
			//		title: 'Summary',
			//		type: 'item',
			//		url: '/transactions'
			//	},
			//	{
			//		id: 'payment',
			//		title: 'Payment',
			//		type: 'item',
			//		url: '/payment'
			//	},
			//	{
			//		id: 'revenue',
			//		title: 'Revenue',
			//		type: 'item',
			//		url: '/revenue'
			//	}
			//]
		},
		// {
		// 	id: 'nurturing',
		// 	title: 'Nurturing',
		// 	type: 'collapsable',
		// 	icon: 'loyalty',
		// 	children: [
		// 		{
		// 			id: 'manage',
		// 			title: 'Direct Mail',
		// 			type: 'item',
		// 			url: '/orders/manage'
		// 		},
		// 		{
		// 			id: 'place',
		// 			title: 'Email',
		// 			type: 'item',
		// 			url: '/orders/place'
		// 		},
		// 		{
		// 			id: 'place',
		// 			title: 'Text',
		// 			type: 'item',
		// 			url: '/orders/place'
		// 		}
		// 	]
		// },
		{
			id: 'customers',
			title: 'Customers',
			type: 'item',
			icon: '',
			url: '/customers'
		},
		{
			id: 'agents',
			title: 'Agents',
			type: 'item',
			icon: '',
			url: '/agents'
		},
		{
			id: 'sources',
			title: 'Lead Sources',
			type: 'collapsable',
			icon: '',
			children: [
				{
					id: 'providers',
					title: 'Providers',
					type: 'item',
					url: '/providers'
				},
				{
					id: 'campaigns',
					title: 'Campaigns',
					type: 'item',
					url: '/campaigns'
				},
				{
					id: 'pricing',
					title: 'Pricing',
					type: 'item',
					url: '/pricing'
				}
			]
		},
		{
			id: 'reports',
			title: 'Reports',
			type: 'collapsable',
			icon: '',
			url: '/reports'
		}
		// ,
		// {
		// 	id: 'reports',
		// 	title: 'Reports',
		// 	type: 'item',
		// 	icon: '',
		// 	url: '/reports'
		// }
	],
	agent: [
		{
			id: 'dashboard',
			title: 'Dashboard',
			type: 'item',
			icon: '',
			url: '/dashboard',
			exactMatch: true
		},
		{
			id: 'leads',
			title: 'Prospects',
			type: 'item',
			icon: '',
			url: '/leads'
		},
		{
			id: 'orders',
			title: 'Orders',
			type: 'collapsable',
			icon: '',
			url: '/orders'
		},
		{
			id: 'account',
			title: 'Account',
			type: 'collapsable',
			icon: '',
			url: '/transactions'

			//children: [
			//	{
			//		id: 'billing',
			//		title: 'Billing',
			//		type: 'item',
			//		url: '/details'
			//	},
			//	{
			//		id: 'summary',
			//		title: 'Summary',
			//		type: 'item',
			//		url: '/transactions'
			//	},
			//	{
			//		id: 'payment',
			//		title: 'Payment',
			//		type: 'item',
			//		url: '/payment'
			//	},
			//	{
			//		id: 'revenue',
			//		title: 'Revenue',
			//		type: 'item',
			//		url: '/revenue'
			//	}
			//]
		},
		// {
		// 	id: 'nurturing',
		// 	title: 'Nurturing',
		// 	type: 'collapsable',
		// 	icon: 'loyalty',
		// 	children: [
		// 		{
		// 			id: 'manage',
		// 			title: 'Direct Mail',
		// 			type: 'item',
		// 			url: '/orders/manage'
		// 		},
		// 		{
		// 			id: 'place',
		// 			title: 'Email',
		// 			type: 'item',
		// 			url: '/orders/place'
		// 		},
		// 		{
		// 			id: 'place',
		// 			title: 'Text',
		// 			type: 'item',
		// 			url: '/orders/place'
		// 		}
		// 	]
		// },
		{
			id: 'customers',
			title: 'Customers',
			type: 'item',
			icon: '',
			url: '/customers'
		}
	],
	auth: []
};

// 	admin: [
// 	{
// 		id: 'dashboard',
// 		title: 'Dashboard',
// 		type: 'item',
// 		icon: 'home',
// 		url: '/dashboard',
// 		exactMatch: true
// 	},
// 	{
// 		id: 'news',
// 		title: 'News',
// 		type: 'item',
// 		icon: 'calendar_view_day',
// 		url: '/news'
// 	},
// 	{
// 		id: 'agents',
// 		title: 'Agents',
// 		type: 'item',
// 		icon: 'people',
// 		url: '/agents'
// 	},
// 	{
// 		id: 'sources',
// 		title: 'Lead Sources',
// 		type: 'collapsable',
// 		icon: 'ballot',
// 		children: [
// 			{
// 				id: 'providers',
// 				title: 'Providers',
// 				type: 'item',
// 				url: '/providers'
// 			},
// 			{
// 				id: 'campaigns',
// 				title: 'Campaigns',
// 				type: 'item',
// 				url: '/campaigns'
// 			},
// 			{
// 				id: 'pricing',
// 				title: 'Pricing',
// 				type: 'item',
// 				url: '/pricing'
// 			}
// 		]
// 	},
// 	{
// 		id: 'credits',
// 		title: 'Credits',
// 		type: 'item',
// 		icon: 'contacts',
// 		url: '/credits'
// 	},
// 	{
// 		id: 'leads',
// 		title: 'Leads',
// 		type: 'item',
// 		icon: 'person',
// 		url: '/leads'
// 	},
// 	{
// 		id: 'transactions',
// 		title: 'Transactions',
// 		type: 'item',
// 		icon: 'monetization_on',
// 		url: '/transactions'
// 	},
// 	{
// 		id: 'reports',
// 		title: 'Reports',
// 		type: 'item',
// 		icon: 'assessment',
// 		url: '/reports'
// 	},
// 	{
// 		id: 'faqs',
// 		title: 'FAQs',
// 		type: 'item',
// 		icon: 'feedback',
// 		url: '/faq'
// 	}
// ],
// agent: [
// 	{
// 		id: 'dashboard',
// 		title: 'Dashboard',
// 		type: 'item',
// 		icon: 'home',
// 		url: '/dashboard',
// 		exactMatch: true
// 	},
// 	{
// 		id: 'news',
// 		title: 'News',
// 		type: 'item',
// 		icon: 'calendar_view_day',
// 		url: '/news'
// 	},
// 	{
// 		id: 'leads',
// 		title: 'Leads',
// 		type: 'item',
// 		icon: 'person',
// 		url: '/leads'
// 	},
// 	{
// 		id: 'faqs',
// 		title: 'FAQs',
// 		type: 'item',
// 		icon: 'feedback',
// 		url: '/faq'
// 	},
// 	{
// 		id: 'orders',
// 		title: 'Orders',
// 		type: 'collapsable',
// 		icon: 'layers',
// 		children: [
// 			{
// 				id: 'manage',
// 				title: 'Manage',
// 				type: 'item',
// 				url: '/orders/manage'
// 			},
// 			{
// 				id: 'place',
// 				title: 'Place',
// 				type: 'item',
// 				url: '/orders/place'
// 			}
// 		]
// 	},
// 	{
// 		id: 'account',
// 		title: 'Account',
// 		type: 'collapsable',
// 		icon: 'account_balance',
// 		children: [
// 			{
// 				id: 'details',
// 				title: 'Account Details',
// 				type: 'item',
// 				url: '/details'
// 			},
// 			{
// 				id: 'summary',
// 				title: 'Account Summary',
// 				type: 'item',
// 				url: '/summary'
// 			}
// 		]
// 	}
// 	],
// 	auth: []
// };
//




export const NAVIGATION_OPTION = {
	role: [
		{
			id: 'dashboard',
			title: 'Dashboard',
			type: 'item',
			icon: '',
			url: '/dashboard',
			exactMatch: true
		},
		{
			id: 'news',
			title: 'News',
			type: 'item',
			icon: '',
			url: '/news'
		},
		{
			id: 'leads',
			title: 'Prospects',
			type: 'item',
			icon: '',
			url: '/leads'
		},
		{
			id: 'orders',
			title: 'Orders',
			type: 'collapsable',
			icon: '',
			url: '/orders'
		},
		{
			id: 'account',
			title: 'Account',
			type: 'collapsable',
			icon: '',
			// url: '/transactions',
			children: [
				{
					id: 'billing',
					title: 'Billing',
					type: 'item',
					url: '/details'
				},
				{
					id: 'summary',
					title: 'Summary',
					type: 'item',
					url: '/transactions'
				},
				{
					id: 'payment',
					title: 'Payment',
					type: 'item',
					url: '/payment'
				},
				{
					id: 'revenue',
					title: 'Revenue',
					type: 'item',
					url: '/revenue'
				}
			]
		},
		{
			id: 'credits',
			title: 'Credits',
			type: 'item',
			icon: '',
			url: '/credits'
		},
		{
			id: 'customers',
			title: 'Customers',
			type: 'item',
			icon: '',
			url: '/customers'
		},
		{
			id: 'reports',
			title: 'Reports',
			type: 'item',
			icon: '',
			url: '/reports'
		},
		{
			id: 'agents',
			title: 'Agents',
			type: 'item',
			icon: '',
			url: '/agents'
		},
		{
			id: 'faqs',
			title: 'FAQs',
			type: 'item',
			icon: '',
			url: '/faq'
		},
		{
			id: 'sources',
			title: 'Lead Sources',
			type: 'collapsable',
			icon: '',
			children: [
				{
					id: 'providers',
					title: 'Providers',
					type: 'item',
					url: '/providers'
				},
				{
					id: 'campaigns',
					title: 'Campaigns',
					type: 'item',
					url: '/campaigns'
				},
				{
					id: 'pricing',
					title: 'Pricing',
					type: 'item',
					url: '/pricing'
				}
			]
		},
		{
			id: 'transactions',
			title: 'Transactions',
			type: 'item',
			icon: '',
			url: '/transactions'
		}
	],
};