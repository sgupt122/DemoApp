import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatButtonModule,
	MatFormFieldModule,
	MatInputModule,
	MatSelectModule,
	MatDialogModule,
	MatProgressSpinnerModule,
	
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FuseSharedModule } from '@fuse/shared.module';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { CallDialogComponent } from '@/main/leads/leads-actions/call-dialog/call-dialog.component';
import { TextDialogComponent } from '@/main/leads/leads-actions/text-dialog/text-dialog.component';
import { EmailDialogComponent } from '@/main/leads/leads-actions/email-dialog/email-dialog.component';
import { DispositionDialogComponent } from '@/main/leads/leads-actions/disposition-dialog/disposition-dialog.component';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
	declarations: [CallDialogComponent, TextDialogComponent, EmailDialogComponent, DispositionDialogComponent],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatetimepickerModule,
		MatDatepickerModule,
		MatSelectModule,
		MatProgressSpinnerModule,
		FuseSharedModule,
		MatNativeDatetimeModule,
		AngularCalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
	],
	entryComponents: [CallDialogComponent, TextDialogComponent, EmailDialogComponent, DispositionDialogComponent]
})
export class LeadsActionsModule {}
