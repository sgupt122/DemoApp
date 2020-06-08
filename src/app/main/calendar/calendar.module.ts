import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CalendarComponent } from '@/main/calendar/calendar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ColorPickerModule } from 'ngx-color-picker';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from "@mat-datetimepicker/core";
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseConfirmDialogModule } from '@fuse/components';
import { CalendarEventFormDialogComponent } from '@/main/calendar/event-form/event-form.component';
import { MatSelectModule } from '@angular/material';
import { EventsEffects, reducer } from '@/main/calendar/store';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EventsService } from '@/_services';
import { ExportEventTypeComponent } from './export-event-type/export-event-type.component';

const routes: Routes = [
	{
		path: '',
		component: CalendarComponent,
	}
];

@NgModule({
	declarations: [CalendarComponent, CalendarEventFormDialogComponent, ExportEventTypeComponent],
	imports: [CommonModule,
		RouterModule.forChild(routes),

		MatButtonModule,
		MatDatepickerModule,
		MatDialogModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatSlideToggleModule,
		MatToolbarModule,
		MatTooltipModule,
		MatSelectModule,
		MatDatetimepickerModule,
		MatNativeDatetimeModule,
		AngularCalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
		ColorPickerModule,

		FuseSharedModule,
		FuseConfirmDialogModule,
		StoreModule.forFeature('events', reducer),
		EffectsModule.forFeature([EventsEffects])
	],
	providers: [
		EventsService
	],
	entryComponents: [
		CalendarEventFormDialogComponent, ExportEventTypeComponent
	]
})
export class CalendarModule { }
