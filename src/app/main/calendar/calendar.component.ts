import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject, Observable } from 'rxjs';
import { startOfDay, isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';

import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { fuseAnimations } from '@fuse/animations';
import * as fromEvents from '@/main/calendar/store';
import { CalendarEventFormDialogComponent } from '@/main/calendar/event-form/event-form.component';
import { Store, select } from '@ngrx/store';
import { IClientDisposition, CalendarEventModel } from '@/_interfaces';
import { EventsService } from '@/_services';
import { ExportEventTypeComponent } from './export-event-type/export-event-type.component';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { LocalStorage } from 'ngx-webstorage';
import { calendar } from '@/_config/config';

interface IDate {
	date: Date;
}

@Component({
	selector: 'app-calendar',
	templateUrl: './calendar.component.html',
	styleUrls: ['./calendar.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class CalendarComponent implements OnInit {
	@LocalStorage() impersonateToken: string;
	private actions: CalendarEventAction[];
	public activeDayIsOpen: boolean;
	private confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
	private dialogRef: MatDialogRef<CalendarEventFormDialogComponent>;
	public events: CalendarEventModel[];
	public refresh: Subject<any> = new Subject();
	public selectedDay: IDate;
	public view: string;
	public viewDate: Date;
	public clientDispositions$: Observable<IClientDisposition[]>;
	private dispositions: Array<string>;
	public userEvents$: Observable<CalendarEventModel[]>;
	public calendarConfig = calendar.calendar;
	constructor(
		private _matDialog: MatDialog,
		private _eventService: EventsService,
		private _store: Store<fromEvents.EventsState>,
		private shared: SharedFunctions
	) {
		// Set the defaults
		this.view = 'day';
		this.viewDate = new Date();
		this.activeDayIsOpen = true;
		this.selectedDay = { date: startOfDay(new Date()) };

		this.actions = [
			{
				label: '<i class="material-icons s-16">edit</i>',
				onClick: ({ event }: { event: CalendarEventModel }): void => {
					this.editEvent('edit', event);
				}
			},
			{
				label: '<i class="material-icons s-16">delete</i>',
				onClick: ({ event }: { event: CalendarEventModel }): void => {
					this.deleteEvent(event);
				}
			}
		];

		/**
		 * Get events from service/server
		 */
		// this.setEvents();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		/**
		 * Watch re-render-refresh for updating db
		 */

		this._store.dispatch(new fromEvents.Load());
		this.userEvents$ = this._store.pipe(select(fromEvents.getUserEvents));
		this.userEvents$.subscribe(res => {
			this.events = res;
			this.events.map(ele => {
				ele.start = new Date(ele.start);
				ele.end = new Date(ele.end);
				ele.actions = this.actions;
				ele.leadId = ele.leadId
			})
		});
		this.clientDispositions$ = this._store.pipe(select(fromEvents.getClientDispositions));
		this.clientDispositions$.subscribe(ele => {
			this.dispositions = [];
			ele.map(value => {
				this.dispositions.push(value.name);
			});
		})
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Before View Renderer
	 *
	 * @param {any} header
	 * @param {any} body
	 */
	beforeMonthViewRender({ header, body }): void {
		/**
		 * Get the selected day
		 */
		const _selectedDay = body.find((_day) => {
			return _day.date.getTime() === this.selectedDay.date.getTime();
		});

		if (_selectedDay) {
			/**
			 * Set selected day style
			 * @type {string}
			 */
			_selectedDay.cssClass = 'cal-selected';
		}

	}

	/**
	 * Day clicked
	 *
	 * @param {MonthViewDay} day
	 */
	dayClicked(day: CalendarMonthViewDay): void {
		const date: Date = day.date;
		const events: CalendarEvent[] = day.events;

		if (isSameMonth(date, this.viewDate)) {
			if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
				this.activeDayIsOpen = false;
			}
			else {
				this.activeDayIsOpen = true;
				this.viewDate = date;
			}
		}
		this.selectedDay = day;
		this.refresh.next();
	}

	/**
	 * Event times changed
	 * Event dropped or resized
	 *
	 * @param {CalendarEvent} event
	 * @param {Date} newStart
	 * @param {Date} newEnd
	 */
	eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
		event.start = newStart;
		event.end = newEnd;
		// console.warn('Dropped or resized', event);
		this.refresh.next(true);
	}

	/**
	 * Delete Event
	 *
	 * @param event
	 */
	deleteEvent(event): void {
		this._store.dispatch(new fromEvents.SetCurrentEventID(event));
		this.confirmDialogRef = this._matDialog.open(FuseConfirmDialogComponent, {
			disableClose: false
		});

		this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
		this.confirmDialogRef.afterClosed().subscribe(result => {
			if (result) {
				if (event.leadId) {
					this._eventService.deletUserEvent(event.id, event.leadId, this.impersonateToken).subscribe(() => {
						this._store.dispatch(new fromEvents.Load());
						this.shared._snackbarMessage('Event Deleted!', 1500);
					});
				} else {
					this._eventService.deletUserEvent(event.id, 0, this.impersonateToken).subscribe(() => {
						this._store.dispatch(new fromEvents.Load());
						this.shared._snackbarMessage('Event Deleted!', 1500);
					});
				}
			}
		});
	}

	/**
	 * Edit Event
	 *
	 * @param {string} action
	 * @param {CalendarEvent} event
	 */
	editEvent(action: string, event: CalendarEventModel): void {
		this._store.dispatch(new fromEvents.SetCurrentEventID(event));
		const eventIndex = this.events.indexOf(event);
		this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
			panelClass: 'event-form-dialog',
			data: {
				event: event,
				action: action
			}
		});
	}

	/**
	 * Add Event
	 */
	addEvent(): void {
		this.dialogRef = this._matDialog.open(CalendarEventFormDialogComponent, {
			panelClass: 'event-form-dialog',
			data: {
				action: 'new',
				date: this.selectedDay.date
			}
		});
	}
	/** exporting events in ics and xlxs extentions */
	exportEvents(): void {
		const dialogRef = this._matDialog.open(ExportEventTypeComponent, {
		}).afterClosed()
			.subscribe((result: string) => {
				const events = [];
				this.events.map(element => {
					const eventObject = {
						title: element.title,
						start_date: new Date(element.start),
						end_date: new Date(element.end),
						start_time: element.start.toLocaleTimeString('it-IT'),
						end_time: element.end.toLocaleTimeString('it-IT'),
						location: element.location,
						notes: element.notes,
						allday: element.allDay
					}
					events.push(eventObject);
				});
				if (result === 'excel') {
					this._eventService.exportAsExcelFile(events, 'Calendar-Events');
				} else if (result === 'ics') {
					this._eventService.exportAsIcsFile(events, 'Calendar-Events-ICS');
				}
			});


	}
}
