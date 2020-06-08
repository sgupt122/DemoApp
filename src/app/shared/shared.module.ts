import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersModule } from '@/main/customers/customers.module';
import { OrdersModule } from '@/main/orders/orders.module';
import { TransactionsModule } from '@/main/transactions/transactions.module';
import { AgentsModule } from '@/main/agents/agents.module';
import { ProvidersModule } from '@/main/providers/providers.module';
import { CampaignsModule } from '@/main/campaigns/campaigns.module';
import { PricingModule } from '@/main/pricing/pricing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CustomersModule,
    OrdersModule,
    TransactionsModule,
    AgentsModule,
    ProvidersModule,
    CampaignsModule,
    PricingModule
  ],
})
export class SharedModule { }






