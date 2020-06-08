import { IDatatableColumn } from "@/_interfaces";

interface IColumn {
	agents: IDatatableColumn[];
	campaigns: IDatatableColumn[];
	customers: IDatatableColumn[];
	leads: IDatatableColumn[];
	orders: IDatatableColumn[];
	pricing: IDatatableColumn[];
	providers: IDatatableColumn[];
	transactions: IDatatableColumn[];
}

export const COLUMNS: IColumn = {
	agents: [
		{ flag: true, name: "User ID", prop: "id" },
		{ flag: true, name: "Email", prop: "email" },
		{ flag: true, name: "First Name", prop: "profile.first_name" },
		{ flag: true, name: "Last Name", prop: "profile.last_name" },
		{ flag: true, name: "Phone", prop: "profile.phone" },
		{ flag: true, name: "Address", prop: "profile.address" },
		{ flag: true, name: "City", prop: "profile.city" },
		{ flag: true, name: "Postal Code", prop: "profile.postal_code" },
		{ flag: true, name: "Status", prop: "email_verified" }
	],
	campaigns: [
		{ flag: true, name: "Provider Name", prop: "provider.name" },
		{ flag: true, name: "Campaign Name", prop: "name" },
		{ flag: true, name: "Campaign Code", prop: "code" },
		{ flag: true, name: "Campaign Billing Code", prop: "billing_code" },
		{ flag: true, name: "Active", prop: "active" },
		{ flag: true, name: "Activated Date", prop: "activated_date" }
	],
	customers: [
		{ flag: true, name: "Status", prop: "status.details" },
		{ flag: true, name: "customerID", prop: "id" },
		{ flag: true, name: "AgentID", prop: "user.id" },
		{ flag: true, name: "Provider", prop: "provider.name" },
		{ flag: true, name: "Campaign", prop: "campaign.lead" },
		{ flag: true, name: "First Name", prop: "first_name" },
		{ flag: true, name: "Last Name", prop: "last_name" },
		{ flag: true, name: "Email", prop: "email" },
		{ flag: true, name: "Phone", prop: "phone" },
		{ flag: true, name: "Address", prop: "address" },
		{ flag: true, name: "City", prop: "city" },
		{ flag: true, name: "Zip", prop: "postal_code" }
	],
	leads: [
		{ flag: true, name: "Status", prop: "status.details" },
		{ flag: true, name: "ID", prop: "id" },
		{ flag: true, name: "Disposition", prop: "disposition.name" },
		{ flag: true, name: "Action", prop: "" },
		{ flag: true, name: "Provider", prop: "provider.name" },
		{ flag: true, name: "Email", prop: "email" },
		{ flag: true, name: "Received", prop: "recieved_date" },
		{ flag: true, name: "Created At", prop: "created_at" },
		{ flag: true, name: "Name", prop: "name"},
		{ flag: true, name: "Address", prop: "address" }
	],
	orders: [
		{ flag: true, name: "OrderID", prop: "id" },
		{ flag: true, name: "Description", prop: "description" },
		{ flag: true, name: "Monthly", prop: "month" },
		{ flag: true, name: "Daily", prop: "day" },
		{ flag: true, name: "Hourly", prop: "hour" },
		{ flag: true, name: "Minute", prop: "minute" },
		{ flag: true, name: "Status", prop: "status_id" },
		{ flag: true, name: "Lead Types", prop: "campaign.lead_type" },
		{ flag: true, name: "Distributions", prop: "" },
		{ flag: true, name: "Geos", prop: "" }
	],
	pricing: [
		{ flag: true, name: "Provider Name", prop: "campaign.provider_name" },
		{ flag: true, name: "Lead Type", prop: "campaign.lead_type" },
		{ flag: true, name: "Campaign Billing Code", prop: "campaign.billing_code" },
		{ flag: true, name: "Price", prop: "price" },
		{ flag: true, name: "Start Date", prop: "activated_date" },
		{ flag: true, name: "End Date", prop: "deleted_date" },
		{ flag: true, name: "Active", prop: "active" }
	],
	providers: [
		{ flag: true, name: "ProviderID", prop: "id" },
		{ flag: true, name: "Provider Name", prop: "name" },
		{ flag: true, name: "Provider Code", prop: "code" },
		{ flag: true, name: "Description", prop: "description" },
		{ flag: true, name: "Active", prop: "active" }
	],
	transactions: [
		{ flag: true, name: "Transaction ID", prop: "id" },
		{ flag: true, name: "Agent ID", prop: "user_id" },
		{ flag: true, name: "Description", prop: "description" },
		{ flag: true, name: "Subsidy", prop: "subsidy" },
		{ flag: true, name: "Balance", prop: "balance" },
		{ flag: true, name: "Created At", prop: "created_at.date" },
		{ flag: true, name: "Amount", prop: "amount" }
		]
};
