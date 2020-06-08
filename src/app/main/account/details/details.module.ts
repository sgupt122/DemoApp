import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from '@/main/account/details/details.component';

const routes: Routes = [
	{
		path: '',
		component: DetailsComponent
	}
];

@NgModule({
	declarations: [DetailsComponent],
	imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DetailsModule {}
