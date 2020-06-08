import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatChipsModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatPaginatorModule,
	MatRippleModule,
	MatSelectModule,
	MatSnackBarModule,
	MatSortModule,
	MatTableModule,
	MatTabsModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FuseSharedModule } from '@fuse/shared.module';
import { ProfileComponent } from './profile.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { TextingPreferencesComponent } from './texting-preferences/texting-preferences.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { PasswordValidator } from '@/main/profile/change-password/password-validator.directive';
import { ProfileEffects, reducer } from '@/main/profile/store';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		FuseSharedModule,
		MatButtonModule,
		MatChipsModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatPaginatorModule,
		MatRippleModule,
		MatSelectModule,
		MatSortModule,
		MatSnackBarModule,
		MatTableModule,
		MatTabsModule,
		NgxMaterialTimepickerModule.forRoot(),
		ReactiveFormsModule,
		StoreModule.forFeature('profile', reducer),
		EffectsModule.forFeature([ProfileEffects]),
		RouterModule.forChild(routes)
	],
	declarations: [
		ProfileComponent,
		BasicInfoComponent,
		ChangePasswordComponent,
		TextingPreferencesComponent,
		PermissionsComponent,
		PasswordValidator
	]
})
export class ProfileModule {}
