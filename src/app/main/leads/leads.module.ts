import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
	MatRadioModule,
	MatDatepickerModule,
	MAT_DATE_FORMATS,
	MAT_DATE_LOCALE,
	MatTooltipModule,
	MatDialogRef,
	MAT_DIALOG_DATA
} from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Routes } from '@angular/router';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FuseSidebarModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { LeadsEffects, reducer } from '@/main/leads/store';
import { LeadsActionsModule } from '@/main/leads/leads-actions/leads-actions.module';
import { LeadsComponent } from './leads.component';
import { LeadsTableComponent } from './leads-table/leads-table.component';
import { LeadsFilterComponent } from './leads-filter/leads-filter.component';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { LeadCreditComponent } from './lead-credit/lead-credit.component';
import { LeadsActionsComponent } from './leads-actions/leads-actions.component';
import { DispositionDialogComponent } from './disposition-dialog/disposition-dialog.component';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { CoreMaterialModule } from 'app/core/material-module/material-module.module';
import { DirectivesModule } from '@/core/directives/directives.module';
import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule as AngularCalendarModule, DateAdapter } from 'angular-calendar';
import { AuthGuard, ProtectGuard } from '@/_guards';
import { LeadsColumnComponent } from './leads-column/leads-column.component';
const routes: Routes = [
	{
		path: '',
		component: LeadsComponent,
		canActivate: [AuthGuard , ProtectGuard]
	}
];

export const MY_FORMATS = {
	parse: {
		dateInput: 'LL'
	},
	display: {
		dateInput: 'LL',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY'
	}
};

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature('leads', reducer),
		EffectsModule.forFeature([LeadsEffects]),
		RouterModule.forChild(routes),
		CoreMaterialModule,
		MatRadioModule,
		MatDatepickerModule,
		MatListModule,
		MatTooltipModule,
		NgxDatatableModule,
		FuseSidebarModule,
		FuseSharedModule,
		LeadsActionsModule,
		DirectivesModule,
		AngularCalendarModule.forRoot({
			provide: DateAdapter,
			useFactory: adapterFactory
		}),
		MatDatetimepickerModule,
		MatNativeDatetimeModule,
		MatDatepickerModule
	],
	declarations: [
		LeadsComponent,
		LeadsTableComponent,
		LeadsFilterComponent,
		LeadDetailsComponent,
		LeadCreditComponent,
		LeadsActionsComponent,
		DispositionDialogComponent,
		LeadsColumnComponent
	],
	providers: [
		{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
		{ provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
		{ provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
		{ provide: MatDialogRef, useValue: {} },
		{ provide: MAT_DIALOG_DATA, useValue: [] }
	],
	entryComponents: [LeadDetailsComponent, LeadCreditComponent, LeadsColumnComponent]
})
export class LeadsModule { }
