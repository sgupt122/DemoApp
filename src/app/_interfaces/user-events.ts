import { CalendarEventAction } from "angular-calendar";

export interface CalendarEventModel {
   id?: number;
   user_id?: number;
   start: Date;
   end?: Date;
   title: string;
   disposition_id: number;
   color?: {
      primary: string,
      secondary: string
   };
   actions?: CalendarEventAction[];
   allDay?: boolean;
   cssClass?: string;
   resizable?: {
      beforeStart?: boolean,
      afterEnd?: boolean
   };
   draggable?: boolean;
   location: string,
   notes: string
   leadId?: number
   impersonateToken?: string
}