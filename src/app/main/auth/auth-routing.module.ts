import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { LockComponent } from '@/main/auth/lock/lock.component';
import { SessionGuard } from '@/_guards';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
	{ canActivate: [SessionGuard], path: 'forgot-password', component: ForgotPasswordComponent },
	{ canActivate: [SessionGuard], path: 'register', component: RegisterComponent },
	{ canActivate: [SessionGuard], path: 'login', component: LoginComponent },
	{ path: 'logout', component: LogoutComponent },
	{ path: 'lock', component: LockComponent },
	{ path: 'reset-password/:reset', component: ResetPasswordComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AuthRoutingModule { }
