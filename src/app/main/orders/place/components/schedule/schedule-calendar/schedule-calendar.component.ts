import {
	ChangeDetectionStrategy,
	Component,
	ViewEncapsulation,
	ChangeDetectorRef,
	Output,
	EventEmitter,
	OnInit, Input, forwardRef
} from '@angular/core';
import {
	CalendarEvent,
	CalendarEventTitleFormatter,
	CalendarEventAction,
	CalendarEventTimesChangedEvent,
	CalendarDateFormatter,
	DateFormatterParams
} from 'angular-calendar';
import * as moment from 'moment';
import { DayViewHourSegment } from 'calendar-utils';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { addDays, addMinutes, endOfWeek, startOfDay, endOfDay } from 'date-fns';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { formatDate } from '@angular/common';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { order } from '@/_config/config';

function floorToNearest(amount: number, precision: number): number {
	return Math.floor(amount / precision) * precision;
}

function ceilToNearest(amount: number, precision: number): number {
	return Math.ceil(amount / precision) * precision;
}

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
	public weekTooltip(event: CalendarEvent, title: string): string {
		// if (!event.meta.tmpEvent) {
		// 	return super.weekTooltip(event, title);
		// }
		return '';
	}
	public week(event: CalendarEvent, title: string): string {
		return '';
	}
	public dayTooltip(event: CalendarEvent, title: string): string {
		if (!event.meta.tmpEvent) {
			return super.dayTooltip(event, title);
		}
	}

}


interface IEvent {
	day: number;
	end: string;
	end_time: Date;
	start_time: Date;
	start: string;
}

export class CustomDateFormatter extends CalendarDateFormatter {
	// public weekViewColumnHeader({ date, locale }: DateFormatterParams): string {
	// 	return formatDate(date, 'EEE', locale); // use short week days
	// }

	public weekViewColumnSubHeader({ date, locale }: DateFormatterParams): string {
		return formatDate(date, '', locale);
	}
}


@Component({
	selector: 'app-schedule-calendar',
	templateUrl: './schedule-calendar.component.html',
	styleUrls: ['./schedule-calendar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: CalendarEventTitleFormatter,
			useClass: CustomEventTitleFormatter
		},
		{
			provide: CalendarDateFormatter,
			useClass: CustomDateFormatter
		},
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ScheduleCalendarComponent),
			multi: true
		}
	],
	encapsulation: ViewEncapsulation.None
})
export class ScheduleCalendarComponent implements OnInit, ControlValueAccessor {
	public viewDate = new Date();
	private endOfView: Date;
	public events: CalendarEvent[] = [];
	private dragToCreateActive: boolean = false;
	private selectedEvent: CalendarEvent;
	private isCopySchedule: boolean = false;
	@Input() private calendarEvent: IEvent[];
	@Input() private isEditMode: boolean;
	@Output() private finalEvent = new EventEmitter();

	actions: CalendarEventAction[] = [];
	allActions: CalendarEventAction[] = [];
	modalData: {
		action: string;
		event: CalendarEvent;
	};
	public checked = [];
	public days = this.shared.days;
	public allDay = order.orderSchedule.allDay;
	constructor(private cdr: ChangeDetectorRef, private shared: SharedFunctions) {
		this.onActions();
	}
	ngOnInit(): void {
		if (this.isEditMode) {
			this.calendarEvent.map(elem => {
				const segment = {
					date: new Date(elem.start_time),
					isStart: false
				};
				this.checkIsWeekEndDate(segment);
				this.events.push(
					{
						start: new Date(elem.start_time),
						end: new Date(elem.end_time),
						title: '',
						actions: this.isCopySchedule ? this.allActions : this.actions,
						resizable: {
							beforeStart: true,
							afterEnd: true
						},
						draggable: true
					}
				);
			});
		}
		this.todayEvent();
	}
	public onChange = (value: any) => { };
	public registerOnTouched = (fn: any) => {
		this.onChange(fn)
	};
	public writeValue = (value: any) => {
		this.onChange(value);
	};
	public registerOnChange = (fn: (val: any) => void) => {
		this.onChange = fn
	};

	public onActions(): void {
		this.actions = [
			{
				label: '<i class="material-icons" title="Delete">delete</i>',
				onClick: ({ event }: { event: CalendarEvent }): void => {
					this.events = this.events.filter(iEvent => iEvent !== event);
					this.refresh();
				}
			},
			{
				label: '<i class="material-icons" title="Duplicate">file_copy</i>',
				onClick: ({ event }: { event: CalendarEvent }): void => {
					this.selectedEvent = event;
					const segment = {
						date: addDays(this.selectedEvent.start, 1),
						isStart: false
					};
					this.checkIsWeekEndDate(segment);
					const data = {
						id: this.events.length,
						title: '',
						start: addDays(this.selectedEvent.start, 1),
						meta: {
							tmpEvent: true
						},
						actions: this.isCopySchedule ? this.allActions : this.actions,
						resizable: {
							beforeStart: true,
							afterEnd: true
						},
						draggable: true
					};
					if (this.selectedEvent.end) {
						data['end'] = addDays(this.selectedEvent.end, 1);
					}
					let isEventExists;
					let xyz = this.events.filter(e => {
						if (e.start.getDate() === data.start.getDate()){
							isEventExists = true;
						}
					});
					if (isEventExists !== true){
						this.events.push(data);
					}
					// this.events.push(data);
					this.refresh();
				}
			}
		];
	}

	/** on changing event */
	public eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
		this.events = this.events.map(iEvent => {
			if (iEvent === event) {
				return {
					...event,
					start: newStart,
					end: newEnd
				};
			}
			return iEvent;
		});
		this.refresh();
	}

	/** on dragging event */
	public startDragToCreate(segment: DayViewHourSegment, mouseDownEvent: MouseEvent, segmentElement: HTMLElement): void {
		this.checkIsWeekEndDate(segment);
		const dragToSelectEvent: CalendarEvent = {
			id: this.events.length,
			title: '',
			start: segment.date,
			meta: {
				tmpEvent: true
			},
			actions: (this.isCopySchedule) ? this.allActions : this.actions,
			resizable: {
				beforeStart: true,
				afterEnd: true
			},
			draggable: true
		};
		let isEventExists: boolean;
		this.events.filter(data => {
			if (data.start.getDate() === dragToSelectEvent.start.getDate()){
				 isEventExists = true;
			}
		});
		if (isEventExists === true){
			this.events = [...this.events];
		}
		else{
			this.events = [...this.events, dragToSelectEvent];
		}
		// this.events = [...this.events, dragToSelectEvent];
		const segmentPosition = segmentElement.getBoundingClientRect();
		this.dragToCreateActive = true;

		fromEvent(document, 'mousemove')
			.pipe(
				finalize(() => {
					delete dragToSelectEvent.meta.tmpEvent;
					this.dragToCreateActive = false;
					this.refresh();
				}),
				takeUntil(fromEvent(document, 'mouseup'))
			)
			.subscribe((mouseMoveEvent: MouseEvent) => {
				const minutesDiff = ceilToNearest(mouseMoveEvent.clientY - segmentPosition.top, 30);
				const daysDiff = floorToNearest(mouseMoveEvent.clientX - segmentPosition.left, segmentPosition.width) / segmentPosition.width;
				const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);

				if (newEnd > segment.date && newEnd < this.endOfView) {
					dragToSelectEvent.end = (newEnd);
				}
				this.refresh();
			});
	}

	/** called when events are added/deleted/dragged to get the current selected events  */
	private refresh(): void {
		const events = [];
		this.events = [...this.events];
		this.events.map(data => {
			const value = {
				day: data['start'].getDay(),
				start: data['start'].toLocaleTimeString('it-IT'),
				start_time: data['start'],
				end_time: data['end']
			}
			if (!data.end) {
				value['end_time'] = data['start'];
				value['end'] = data['start'].toLocaleTimeString('it-IT');

			} else {
				value['end_time'] = data['end'];
				value['end'] = data['end'].toLocaleTimeString('it-IT');
			}
			events.push(value);
		});
		this.onChange(events);
		this.finalEvent.emit(events);
	}

	/** to check the end of week */
	public checkIsWeekEndDate(segment: DayViewHourSegment): void {
		this.endOfView = endOfWeek(this.viewDate);
		this.isCopySchedule = false;
		if (segment.date.getDay() === this.endOfView.getDay()) {
			this.isCopySchedule = true;
			this.allActions = this.actions.filter((data, index) => {
				if (index === 0) return data;
			});
		}
	}

	/**
	 * for selecting all day event
	 */
	public selectAllDayEvent(event, day): void {
		if (event.checked) {
			this.events.filter((data, i) => {
				if (data.start.getDate() === startOfDay(moment().day(day).toDate()).getDate()){
					this.events.splice(i, 1);
				}
			});
			this.events = [
				...this.events,
				{
					title: 'New event',
					start: startOfDay(moment().day(day).toDate()),
					end: endOfDay(moment().day(day).toDate()),
					draggable: false,
					resizable: {
						beforeStart: false,
						afterEnd: false
					},
					actions: this.isCopySchedule ? this.allActions : this.actions
				}
			];
		}
		else {
			this.events.map((ele, i) => {
				if (ele.start.toString() === startOfDay(moment().day(day).toDate()).toString() && ele.end.toString() === endOfDay(moment().day(day).toDate()).toString()) {
					this.events.splice(i, 1);
				}
			});
		}
		this.refresh();
	}

	/**
	 * for auto check all day checkbox
	 */
	public todayEvent(): any {
		return this.events.map((ele) => {
			const day = this.days.find((e, i) => i === moment(ele.start).day());
			if (ele.start.toString() === startOfDay(moment().day(day).toDate()).toString() && ele.end.toString() === endOfDay(moment().day(day).toDate()).toString()) {
				this.checked.push(day);
				return this.checked;
			}
		});
	}
}
