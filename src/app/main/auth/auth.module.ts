import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatDialogModule,
	MatSelectModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LogoutComponent } from './logout/logout.component';
import { LockComponent } from './lock/lock.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CustomFormsModule } from 'ng2-validation'

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatDialogModule,
		MatSelectModule,
		FuseSharedModule,
		AuthRoutingModule,
		CustomFormsModule
	],
	declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, LogoutComponent, LockComponent, ResetPasswordComponent]
})
export class AuthModule { }
