import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatIconModule, MatTabsModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { FuseDemoModule, FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { TermsAndConditionsComponent } from '@/main/legal/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
	{
		path: 'terms-and-conditions',
		component: TermsAndConditionsComponent
	},
	{
		path: 'privacy-policy',
		component: PrivacyPolicyComponent
	}
];

@NgModule({
	declarations: [TermsAndConditionsComponent, PrivacyPolicyComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		MatButtonModule,
		MatIconModule,
		MatTabsModule,

		FuseSidebarModule,
		FuseSharedModule,
		FuseDemoModule
	]
})
export class LegalModule {}
