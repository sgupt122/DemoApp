import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@/_guards';

const routes: Routes = [
	{
		path: 'details',
		loadChildren: './main/account/details/details.module#DetailsModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'summary',
		loadChildren: './main/account/summary/summary.module#SummaryModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'payment',
		loadChildren: './main/account/payment/payment.module#PaymentModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'revenue',
		loadChildren: './main/account/revenue/revenue.module#RevenueModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'news',
		loadChildren: './main/news/news.module#NewsModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'faq',
		loadChildren: './main/faq/faq.module#FaqModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'providers',
		loadChildren: './main/providers/providers.module#ProvidersModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'campaigns',
		loadChildren: './main/campaigns/campaigns.module#CampaignsModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'pricing',
		loadChildren: './main/pricing/pricing.module#PricingModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'leads',
		loadChildren: './main/leads/leads.module#LeadsModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'customers',
		loadChildren: './main/customers/customers.module#CustomersModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'agents',
		loadChildren: './main/agents/agents.module#AgentsModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'orders',
		loadChildren: './main/orders/orders.module#OrdersModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'profile',
		loadChildren: './main/profile/profile.module#ProfileModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'settings',
		loadChildren: './main/users-settings/users-settings.module#UsersSettingsModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'calendar',
		loadChildren: './main/calendar/calendar.module#CalendarModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'transactions',
		loadChildren: './main/transactions/transactions.module#TransactionsModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'reports',
		loadChildren: './main/reports/reports.module#ReportsModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'credits',
		loadChildren: './main/credits/credits.module#CreditsModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'legal',
		loadChildren: './main/legal/legal.module#LegalModule',
		canActivate: [AuthGuard]
	},
	{
		path: 'auth',
		loadChildren: './main/auth/auth.module#AuthModule'
	},
	{
		path: 'dashboard',
		loadChildren: './main/dashboard/dashboard.module#DashboardModule',
		canActivate: [AuthGuard]
	},
	{
		path: '',
		redirectTo: '/auth/login',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: '/auth/login'
	}
];

@NgModule({
	declarations: [],
	imports: [RouterModule.forRoot(routes, {useHash:true})]
})
export class AppRoutingModule {}
