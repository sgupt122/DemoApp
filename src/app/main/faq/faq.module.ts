import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatExpansionModule, MatIconModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FuseSharedModule } from '@fuse/shared.module';

import { reducer, FaqsEffects } from '@/main/faq/store';
import { FaqComponent } from './component/faq.component';
import { FaqShellComponent } from './shell/faq-shell.component';

const routes: Routes = [
	{
		path: '',
		component: FaqShellComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('faqs', reducer),
		EffectsModule.forFeature([FaqsEffects]),
		RouterModule.forChild(routes),

		MatExpansionModule,
		MatIconModule,

		FuseSharedModule
	],
	declarations: [FaqComponent, FaqShellComponent]
})
export class FaqModule {}
