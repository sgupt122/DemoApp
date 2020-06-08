import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatListModule, MAT_DIALOG_DATA, MatDialogRef,
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { CustomersEffects, reducer } from '@/main/customers/store';
import { CustomersComponent } from './customers.component';
import { CustomersTableComponent } from './customers-table/customers-table.component';
import { CustomersFilterComponent } from './customers-filter/customers-filter.component';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { MATERIAL_MODULE } from 'app/core/material-module/material-module.module';
import { DirectivesModule } from '@/core/directives/directives.module';
import { CustomersColumnComponent } from './customers-column/customers-column.component';

const routes: Routes = [
	{
		path: '',
		component: CustomersComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('customers', reducer),
		EffectsModule.forFeature([CustomersEffects]),
		RouterModule.forChild(routes),
		NgxDatatableModule,
		MatListModule,
		FuseSidebarModule,
		FuseSharedModule,
		MATERIAL_MODULE,
		DirectivesModule
	],
	declarations: [
		CustomersComponent,
		CustomersTableComponent,
		CustomersFilterComponent,
		CustomerDetailsComponent, 
		CustomersColumnComponent
	],
	providers: [
		{ provide: MAT_DIALOG_DATA, useValue: {} },
		{ provide: MatDialogRef, useValue: {} },
	],
	exports: [
		CustomerDetailsComponent
	],
	entryComponents: [CustomerDetailsComponent, CustomersColumnComponent],

})
export class CustomersModule { }
