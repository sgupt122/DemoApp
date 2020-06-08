import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatOptionModule,
	MatSelectModule,
	MatSnackBarModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FuseSharedModule } from '@fuse/shared.module';

import { reducer, ProvidersEffects } from '@/main/providers/store';
import { FeaturesModule } from '@/helper-components/features.module';
import { ProvidersComponent } from './providers.component';
import { ProvidersFormComponent } from './providers-form/component/providers-form.component';
import { ProvidersFilterComponent } from './providers-filter/providers-filter.component';
import { ProvidersTableComponent } from './providers-table/providers-table.component';
import { ProvidersAddEditComponent } from './providers-add-edit/providers-add-edit.component';
import { ProvidersFormShellComponent } from './providers-form/shell/providers-form-shell.component';
import { DirectivesModule } from '@/core/directives/directives.module';
import { ProvidersColumnComponent } from './providers-column/providers-column.component';
import { MATERIAL_MODULE } from '@/core/material-module/material-module.module';
import { FuseSidebarModule } from '@fuse/components';

const routes: Routes = [
	{
		path: ':action',
		component: ProvidersFormShellComponent
	},
	{
		path: '',
		component: ProvidersComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		MatSnackBarModule,
		MATERIAL_MODULE,
		MatListModule,
		DirectivesModule,
		NgxDatatableModule,
		FuseSidebarModule,


		StoreModule.forFeature('providers', reducer),
		EffectsModule.forFeature([ProvidersEffects]),

		FuseSharedModule,

		FeaturesModule
	],
	declarations: [
		ProvidersComponent,
		ProvidersFormComponent,
		ProvidersFilterComponent,
		ProvidersTableComponent,
		ProvidersAddEditComponent,
		ProvidersFormShellComponent,
		ProvidersColumnComponent
	],
	providers: [],
	entryComponents: [ProvidersColumnComponent]
})
export class ProvidersModule {}
