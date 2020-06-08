import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatIconModule,
	MatMenuModule,
	MatSelectModule,
	MatTabsModule
} from '@angular/material';
import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '@/_services';

const routes: Routes = [
	{
		path: '',
		component: DashboardComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),

		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatMenuModule,
		MatSelectModule,
		MatTabsModule,

		AgmCoreModule.forRoot({
			apiKey: ''
		}),
		ChartsModule,
		NgxChartsModule,

		FuseSharedModule,
		FuseWidgetModule
	],
	declarations: [DashboardComponent],
	providers: [DashboardService]
})
export class DashboardModule {}
