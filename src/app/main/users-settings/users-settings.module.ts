import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';

import { UsersSettingsComponent } from './users-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material';
import { NavigationsComponent } from './navigations/navigations.component';
import { MATERIAL_MODULE } from '@/core/material-module/material-module.module';
import { FormsModule } from '@angular/forms';
import { LeadsActionComponent } from './leads-action/leads-action.component';
import { OrderTypesComponent } from './order-types/order-types.component';

const routes: Routes = [
	{
		path: '',
		component: UsersSettingsComponent
	}
];

@NgModule({
  declarations: [
    UsersSettingsComponent,
    NavigationsComponent,
    LeadsActionComponent,
    OrderTypesComponent
  ],
  imports: [
    CommonModule,
    FuseSharedModule,
    MatTabsModule,
    MATERIAL_MODULE,
    FormsModule,
		RouterModule.forChild(routes)

  ]
})
export class UsersSettingsModule { }
