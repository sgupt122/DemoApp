import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { SummaryComponent } from '@/main/account/summary/summary.component';

const routes: Routes = [
	{
		path: '',
		component: SummaryComponent
	}
];

@NgModule({
	declarations: [SummaryComponent],
	imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SummaryModule {}
