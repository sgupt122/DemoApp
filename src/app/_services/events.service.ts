import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environment/environment';
import { IApiSuccess, IClientDisposition } from '@/_interfaces';
import { CalendarEventModel } from '@/_interfaces/user-events';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as ICS from 'ics-generator'
import { IUser } from '@/_interfaces';
import { LocalStorage } from 'ngx-webstorage';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
const ICS_EXTENSION = '.ics';
@Injectable({
    providedIn: 'root'
})
export class EventsService {
    private readonly _apiUrl = environment.apiUrl;
    @LocalStorage() public user: IUser;

	/**
	 * Constructor
	 *
	 * @param {HttpClient} _http
	 */
    constructor(private _http: HttpClient) { }

    public getClientDispositions(): Observable<IApiSuccess<IClientDisposition[]>> {
        return this._http.get<IApiSuccess<IClientDisposition[]>>(`${this._apiUrl}/client-dispositions`).pipe(tap());
    }
    public createUserEvents(event: CalendarEventModel): Observable<IApiSuccess<CalendarEventModel>> {
        return this._http.post<IApiSuccess<CalendarEventModel>>(`${this._apiUrl}/user-events`, event);
    }
    public getEvents(): Observable<IApiSuccess<CalendarEventModel[]>> {
        return this._http.get<IApiSuccess<CalendarEventModel[]>>(`${this._apiUrl}/user-events`);
    }
    public updateUserEvent(event: CalendarEventModel): Observable<IApiSuccess<CalendarEventModel>> {
        return this._http.patch<IApiSuccess<CalendarEventModel>>(`${this._apiUrl}/user-events/${event.id}`, event);
    }
    public deletUserEvent(id: number, leadId: number = 0, impersonateToken: string): Observable<IApiSuccess<CalendarEventModel>> {
        if (impersonateToken) {
            return this._http.delete<IApiSuccess<CalendarEventModel>>(`${this._apiUrl}/user-events/${id}/${leadId}/${impersonateToken}`);
        } else {
            return this._http.delete<IApiSuccess<CalendarEventModel>>(`${this._apiUrl}/user-events/${id}/${leadId}`);
        }
    }
    public exportAsExcelFile(json: any[], excelFileName: string): void {
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        if (!worksheet['!cols']) {
            worksheet['!cols'] = [];
        }
        worksheet['!cols'].push({ width: 40 }, { width: 20 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 10 }, { width: 20 }, { width: 40 }, { width: 10 })
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

    public exportAsIcsFile(json: any[], excelFileName): void {
        const calOptions = {
            prodId: "charcoal",
        };
        const cal = new ICS(calOptions);
        json.map((ele, index) => {
            const newEvent = cal.createEvent({
                summary: ele.title,
                dtStart: new Date(ele.start_date),
                dtEnd: new Date(ele.end_date),
                location: ele.location,
                //disposition: ele.disposition,
                uid: index.toString(),
                organizer: { user: this.user.profile.first_name + this.user.profile.last_name, mailTo: this.user.email },
                attendees: [
                    { cn: "Tony Tiger", mailTo: "tony@sugarmills.com", partStat: "NEEDS-ACTION" }
                ],
                allDay: ele.allDay,
                description: ele.notes
            })
            cal.addEvent(newEvent);
        });
        const events = cal.toIcsString();
        this.saveAsIcsFile(events, excelFileName);
    }
    private saveAsIcsFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'text/ics' });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + ICS_EXTENSION);
    }
}
