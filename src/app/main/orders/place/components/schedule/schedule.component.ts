import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IOrder } from '@/_interfaces';
import { commonBtn, order } from '@/_config/config';

@Component({
	selector: 'app-order-schedule',
	templateUrl: './schedule.component.html',
	styleUrls: ['./schedule.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class ScheduleComponent implements OnInit {
	@Input() public scheduleFormGroup: FormGroup;
	@Input() public order: IOrder;
	@Input() public isEditMode: boolean;
	public orderConfig = {
		commonBtn: commonBtn,
		commonLb: order.orderSchedule
	}
	constructor(private _formBuilder: FormBuilder) { }

	public ngOnInit(): void {
	}

	/** getting the final events which are emitted from schedule-calendar component */
	scheduleEventData(scheduleData): void {
		const schedules = this.scheduleFormGroup.controls.data as FormArray;
		while (schedules.length !== 0) {
			schedules.removeAt(0);
		}
		scheduleData.map(elem => {
			schedules.push(this._formBuilder.group({
				day: elem.day,
				end: elem.end,
				start_time: elem.start_time,
				end_time: elem.end_time,
				start: elem.start
			}));
		});
	}
}
