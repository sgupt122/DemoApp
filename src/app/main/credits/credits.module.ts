import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreditsComponent } from './credits.component';

const routes: Routes = [{ path: '', component: CreditsComponent }];

@NgModule({
	declarations: [CreditsComponent],
	imports: [CommonModule, RouterModule.forChild(routes)]
})
export class CreditsModule {}
