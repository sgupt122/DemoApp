import { Component, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IClientDisposition, CalendarEventModel, IUser } from '@/_interfaces';
import * as fromEvents from '@/main/calendar/store';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { LocalStorage } from 'ngx-webstorage';
import { EventsService } from '@/_services';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { commonBtn, dispostionForm } from '@/_config/config';
@Component({
    selector: 'calendar-event-form-dialog',
    templateUrl: './event-form.component.html',
    styleUrls: ['./event-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class CalendarEventFormDialogComponent implements OnInit {
    public action: string;
    public event: CalendarEventModel;
    public eventForm: FormGroup;
    public dialogTitle: string;
    public clientDispositions$: Observable<IClientDisposition[]>;
    private currentEventId: Observable<number>;
    @LocalStorage() public user: IUser;
    @LocalStorage() public impersonateToken: string;
    public today: Date = new Date();
    private currentID: number;
    private oldEventObj;
    public dispostionConfigTxt = {
        commonBtn: commonBtn,
        commonLb: dispostionForm
    }
    /**
     * Constructor
     *
     * @param {MatDialogRef<CalendarEventFormDialogComponent>} matDialogRef
     * @param _data
     * @param {FormBuilder} _formBuilder
     * @param {Store} _store
     * @param {Title} _titleService
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        public matDialogRef: MatDialogRef<CalendarEventFormDialogComponent>,
        @Inject(MAT_DIALOG_DATA) private _data: any,
        private _formBuilder: FormBuilder,
        private _store: Store<fromEvents.EventsState>,
        private _eventService: EventsService,
        private shared: SharedFunctions
    ) {
        this.event = _data.event;
        this.action = _data.action;
        if (this.action === 'edit') {
            this.dialogTitle = this.event.title;
        }
        else {
            this.dialogTitle = 'New Event';
            this.event = {
                ...this.event,
                allDay: _data.allDay || false,
                start: _data.date,
                end: _data.date,
            };
        }

        this.eventForm = this.createEventForm();
        this._store.dispatch(new fromEvents.LoadClientDispositions());
        this.clientDispositions$ = this._store.pipe(select(fromEvents.getClientDispositions));
    }

    ngOnInit(): void {
        this.getCurrentEventID();
        this.eventForm.controls['id'].setValue(this.currentID);
        this.oldEventObj = this.eventForm.value;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the event form
     *
     * @returns {FormGroup}
     */
    createEventForm(): FormGroup {
        return new FormGroup({
            id: new FormControl(),
            user_id: new FormControl(this.user.id),
            title: new FormControl(this.event.title),
            disposition_id: new FormControl(this.event.disposition_id),
            start: new FormControl(this.event.start),
            end: new FormControl(this.event.end),
            allDay: new FormControl(this.event.allDay),
            location: new FormControl(this.event.location),
            notes: new FormControl(this.event.notes),
            leadId: new FormControl(this.event.leadId)
        });
    }
    /** adding events  */
    addEvents(): void {
        this.eventForm.value.impersonateToken = this.impersonateToken;
        this._store.dispatch(new fromEvents.CreateUserEvents(this.eventForm.value));
        this.shared._snackbarMessage('Event Saved!', 1500);
    }

    /** getting the current event id */
    getCurrentEventID(): void {
        this.currentEventId = this._store.pipe(select(fromEvents.getCurrentEventID));
        this.currentEventId.subscribe(res => {
            this.currentID = res;
        });
    }

    /** updating the event */
    updateEvents(): void {
        this.getCurrentEventID();
        const objKeys = Object.keys(this.eventForm.value)
        objKeys.map(key => {
            if (this.oldEventObj[key] === this.eventForm.value[key]) {
                this.eventForm.get(key).reset();
            }
        });
        this.eventForm.controls['id'].setValue(this.currentID);
        this.eventForm.controls['leadId'].setValue(this.event.leadId);
        if (this.eventForm.controls['disposition_id'].value) {
            this.eventForm.controls['disposition_id'].setValue(this.eventForm.controls['disposition_id'].value);
        } else {
            this.eventForm.controls['disposition_id'].setValue(this.event.disposition_id);
        }

        this.eventForm.value.impersonateToken = this.impersonateToken;
        this._store.dispatch(new fromEvents.UpdateEvent(this.eventForm.value));
        this._store.dispatch(new fromEvents.Load());
        this.shared._snackbarMessage('Event Updated!', 1500);
    }

    /** deleting the event */
    deleteEvent(): void {
        this.getCurrentEventID();
        if (this.event.leadId) {
            this._eventService.deletUserEvent(this.currentID, this.event.leadId, this.impersonateToken).subscribe(() => {
                this._store.dispatch(new fromEvents.Load());
            });
        }
        else {
            this._eventService.deletUserEvent(this.currentID, 0, this.impersonateToken).subscribe(() => {
                this._store.dispatch(new fromEvents.Load());
            });
        }
        this.shared._snackbarMessage('Event Deleted!', 1500);
    }

    public disabledBtn(): void {
        if (this.event.leadId) {
            if (this.eventForm.controls.disposition_id.value === 0) {
                this.eventForm.get('disposition_id').setValue('');
                this.eventForm.get('disposition_id').setValidators(Validators.required);
            }
            else if (this.eventForm.controls.disposition_id.value !== 2) {
                this.eventForm.get('title').clearValidators();
                this.eventForm.get('notes').clearValidators();
                this.eventForm.get('location').clearValidators();
                this.eventForm.get('start').clearValidators();
                this.eventForm.get('end').clearValidators();
                this.updateValueAndValidity();
            }
            else {
                this.eventForm.get('title').setValidators(Validators.required);
                this.eventForm.get('notes').setValidators(Validators.required);
                this.eventForm.get('location').setValidators(Validators.required);
                this.eventForm.get('start').setValidators(Validators.required);
                this.eventForm.get('end').setValidators(Validators.required);
                this.updateValueAndValidity();
            }
        }
    }

    private updateValueAndValidity(): void {
        this.eventForm.get('title').updateValueAndValidity();
        this.eventForm.get('notes').updateValueAndValidity();
        this.eventForm.get('start').updateValueAndValidity();
        this.eventForm.get('location').updateValueAndValidity();
        this.eventForm.get('end').updateValueAndValidity();
    }
}
