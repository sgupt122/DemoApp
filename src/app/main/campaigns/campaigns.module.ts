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

import { reducer, CampaignsEffects } from '@/main/campaigns/store';
import { CampaignsComponent } from './campaigns.component';
import { CampaignsFormComponent } from './campaigns-form/component/campaigns-form.component';
import { CampaingsAddEditComponent } from './campaings-add-edit/campaings-add-edit.component';
import { CampaingsFilterComponent } from './campaings-filter/campaings-filter.component';
import { CampaingsTableComponent } from './campaings-table/campaings-table.component';
import { CampaignsFormShellComponent } from './campaigns-form/shell/campaigns-form-shell.component';
import { DirectivesModule } from '@/core/directives/directives.module';
import { CampaignsColumnComponent } from './campaigns-column/campaigns-column.component';
import { MATERIAL_MODULE } from '@/core/material-module/material-module.module';
import { FuseSidebarModule } from '@fuse/components';

const routes: Routes = [
	{
		path: ':action',
		component: CampaignsFormShellComponent
	},
	{
		path: '',
		component: CampaignsComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		StoreModule.forFeature('campaigns', reducer),
		EffectsModule.forFeature([CampaignsEffects]),

		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		MatSnackBarModule,
		NgxDatatableModule,
		MATERIAL_MODULE,
		DirectivesModule,
		FuseSharedModule,
		FuseSidebarModule
	],
	declarations: [
		CampaignsComponent,
		CampaignsFormComponent,
		CampaingsAddEditComponent,
		CampaingsFilterComponent,
		CampaingsTableComponent,
		CampaignsFormShellComponent,
		CampaignsColumnComponent
	],
	entryComponents: [ CampaignsColumnComponent ]
})
export class CampaignsModule {}
