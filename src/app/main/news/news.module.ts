import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatCheckboxModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatOptionModule,
	MatPaginatorModule,
	MatSelectModule,
	MatSnackBarModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FuseSharedModule } from '@fuse/shared.module';

import { reducer, NewsEffects } from '@/main/news/store';
import { NewsComponent } from './news.component';
import { NewsFormComponent } from './news-form/component/news-form.component';
import { NewsFilterComponent } from './news-filter/news-filter.component';
import { NewsAddEditComponent } from './news-add-edit/news-add-edit.component';
import { NewsContentComponent } from './news-content/news-content.component';
import { NewsFormShellComponent } from './news-form/shell/news-form-shell.component';

const routes: Routes = [
	{
		path: ':action',
		component: NewsFormShellComponent
	},
	{
		path: '',
		component: NewsComponent
	}
];

@NgModule({
	imports: [
		CommonModule,

		MatIconModule,
		MatPaginatorModule,
		MatButtonModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		MatSnackBarModule,

		StoreModule.forFeature('news', reducer),
		EffectsModule.forFeature([NewsEffects]),

		RouterModule.forChild(routes),

		FuseSharedModule
	],
	declarations: [
		NewsComponent,
		NewsFormComponent,
		NewsFilterComponent,
		NewsAddEditComponent,
		NewsContentComponent,
		NewsFormShellComponent
	]
})
export class NewsModule {}
