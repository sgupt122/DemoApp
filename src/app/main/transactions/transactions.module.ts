import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatDividerModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatSelectModule,
	MAT_DIALOG_DATA,
	MatDialogRef
} from '@angular/material';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { TransactionsComponent } from './transactions.component';
import { TransactionsEffects, reducer } from '@/main/transactions/store';
import { TransactionsTableComponent } from './transactions-table/transactions-table.component';
import { TransactionsFilterComponent } from './transactions-filter/transactions-filter.component';
import { TransactionsColumnComponent } from './transactions-column/transactions-column.component';
import { MATERIAL_MODULE } from '@/core/material-module/material-module.module';
import { DirectivesModule } from '@/core/directives/directives.module';

const routes: Routes = [
	{
		path: '',
		component: TransactionsComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature('transactions', reducer),
		EffectsModule.forFeature([TransactionsEffects]),

		MatCheckboxModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatDividerModule,
		MatSelectModule,
		MATERIAL_MODULE,

		NgxDatatableModule,

		FuseSidebarModule,
		FuseSharedModule
	],
	declarations: [
		TransactionsComponent, 
		TransactionsTableComponent, 
		TransactionsFilterComponent, 
		TransactionsColumnComponent
	],
	entryComponents: [TransactionsColumnComponent],
	providers: [
		{ provide: MAT_DIALOG_DATA, useValue: {} },
		{ provide: MatDialogRef, useValue: {} },
	]
})
export class TransactionsModule {}
