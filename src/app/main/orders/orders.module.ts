import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
	MAT_DIALOG_DATA,
	MAT_DIALOG_DEFAULT_OPTIONS,
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatDialogModule,
	MatDialogRef,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatOptionModule,
	MatProgressBarModule,
	MatRadioModule,
	MatSelectModule,
	MatSnackBarModule,
	MatStepperModule,
	MatTooltipModule
} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { FuseSharedModule } from '@fuse/shared.module';
import { OrdersComponent } from './orders.component';
import { PlaceComponent } from './place/components/place.component';
import { DetailsComponent } from './place/components/details/details.component';
import { LeadTypesComponent } from './place/components/lead-types/lead-types.component';
import { GeosComponent } from './place/components/geos/geos.component';
import { ScheduleComponent } from './place/components/schedule/schedule.component';
import { DistributionsComponent } from './place/components/distributions/distributions.component';
import { ReviewComponent } from './place/components/review/review.component';
import { OrdersTableComponent } from './orders-table/orders-table.component';
import { OrdersEffects, reducer } from '@/main/orders/store';
import { OrdersButtonsComponent } from './orders-buttons/orders-buttons.component';
import { OrdersAddEditComponent } from './orders-add-edit/orders-add-edit.component';
import { PlaceOrderShellComponent } from './place/shell/place-order-shell.component';
import { OrderTypeDialogComponent } from '@/main/orders/order-type-dialog/order-type-dialog.component';
import { ScheduleCalendarComponent } from './place/components/schedule/schedule-calendar/schedule-calendar.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FusePipesModule } from '@fuse/pipes/pipes.module';
import { DirectivesModule } from '@/core/directives/directives.module';
import { AgmCoreModule } from '@agm/core';
import { OrderColumnComponent } from './order-column/order-column.component';
import { FuseSidebarModule } from '@fuse/components';
import { DragDropModule } from '@angular/cdk/drag-drop'

const routes: Routes = [
	{
		path: '',
		component: OrdersComponent
	},
	{
		path: ':action',
		component: PlaceOrderShellComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forChild(routes),

		DragDropModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatStepperModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatOptionModule,
		MatSelectModule,
		MatTooltipModule,
		MatRadioModule,
		MatDialogModule,
		MatProgressBarModule,
		MatCheckboxModule,
		MatSnackBarModule,
		MatCardModule,
		MatListModule,
		NgxDatatableModule,
		FuseSidebarModule,
		FusePipesModule,
		DirectivesModule,
		CalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyD9lYj2rwo10QYC6HpNE2mYxZL0vMMF-DM'
		}),
		StoreModule.forFeature('orders', reducer),
		EffectsModule.forFeature([OrdersEffects]),

		FuseSharedModule
	],
	declarations: [
		OrdersComponent,
		PlaceComponent,
		DetailsComponent,
		LeadTypesComponent,
		GeosComponent,
		ScheduleComponent,
		DistributionsComponent,
		ReviewComponent,
		OrdersTableComponent,
		OrdersButtonsComponent,
		OrdersAddEditComponent,
		PlaceOrderShellComponent,
		OrderTypeDialogComponent,
		ScheduleCalendarComponent,
		OrderDetailsComponent,
		OrderColumnComponent,
	],
	entryComponents: [OrderTypeDialogComponent, OrderDetailsComponent, OrderColumnComponent],
	providers: [
		{ provide: MAT_DIALOG_DATA, useValue: {} },
		{ provide: MatDialogRef, useValue: {} },
		{ provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
	]
})
export class OrdersModule { }
