import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatOptionModule,
	MatSelectModule,
	MatSnackBarModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FuseSharedModule } from '@fuse/shared.module';

import { reducer, PricingEffects } from '@/main/pricing/store';
import { PricingComponent } from './pricing.component';
import { PricingFormComponent } from './pricing-form/component/pricing-form.component';
import { PricingAddEditComponent } from './pricing-add-edit/pricing-add-edit.component';
import { PricingFilterComponent } from './pricing-filter/pricing-filter.component';
import { PricingTableComponent } from './pricing-table/pricing-table.component';
import { PricingFormShellComponent } from './pricing-form/shell/pricing-form-shell.component';
import { DirectivesModule } from '@/core/directives/directives.module';
import { PricingColumnComponent } from './pricing-column/pricing-column.component';
import { MATERIAL_MODULE } from '@/core/material-module/material-module.module';
import { FuseSidebarModule } from '@fuse/components';

const routes: Routes = [
	{
		path: ':action',
		component: PricingFormShellComponent
	},
	{
		path: '',
		component: PricingComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature('pricing', reducer),
		EffectsModule.forFeature([PricingEffects]),

		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		MATERIAL_MODULE,
		MatSnackBarModule,
		NgxDatatableModule,
		DirectivesModule,
		FuseSharedModule,
		FuseSidebarModule
	],
	declarations: [
		PricingComponent,
		PricingFormComponent,
		PricingAddEditComponent,
		PricingFilterComponent,
		PricingTableComponent,
		PricingFormShellComponent,
		PricingColumnComponent
	],
	entryComponents: [ PricingColumnComponent ]
})
export class PricingModule {}
