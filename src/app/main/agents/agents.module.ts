import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatIconModule,
	MatCheckboxModule,
	MatFormFieldModule,
	MatInputModule,
	MatButtonModule,
	MatSnackBarModule,
	MatSelectModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';
import { AgentsComponent } from './agents.component';
import { AgentsService } from '@/_services/agents.service';
import { AgentsEffects, reducer } from '@/main/agents/store';
import { AgentsFormComponent } from './agents-form/component/agents-form.component';
import { AgentsTableComponent } from './agents-table/agents-table.component';
import { AgentsFilterComponent } from './agents-filter/agents-filter.component';
import { AgentsAddEditComponent } from './agents-add-edit/agents-add-edit.component';
import { AgentsFormShellComponent } from './agents-form/shell/agents-form-shell.component';
import { DirectivesModule } from '@/core/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { AgentsColumnComponent } from './agents-column/agents-column.component';
import { MATERIAL_MODULE } from '@/core/material-module/material-module.module';
const routes: Routes = [
	{
		path: ':action',
		component: AgentsFormShellComponent
	},
	{
		path: '',
		component: AgentsComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		FuseSidebarModule,
		FuseSharedModule,
		MatCheckboxModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSnackBarModule,
		MatSelectModule,
		NgxDatatableModule,
		MATERIAL_MODULE,
		DirectivesModule,
		StoreModule.forFeature('agents', reducer),
		EffectsModule.forFeature([AgentsEffects]),
		RouterModule.forChild(routes),
		FormsModule,
	],
	declarations: [
		AgentsComponent,
		AgentsFormComponent,
		AgentsTableComponent,
		AgentsFilterComponent,
		AgentsAddEditComponent,
		AgentsFormShellComponent,
		AgentsColumnComponent
	],
	providers: [AgentsService],
	entryComponents: [AgentsColumnComponent]
})
export class AgentsModule { }
