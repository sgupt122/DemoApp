import { Injectable } from "@angular/core";
import { LocalStorageService } from "ngx-webstorage";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
declare const Pusher: any;

@Injectable({
   providedIn: 'root'
})
export class NotificationService {
   public pusher: any;
   public eventsChannel: any;
   public leadsChannel: any;

   public notificationCount: number = 0;
   constructor(private _localStorage: LocalStorageService, private http: HttpClient, private router: Router) {
      this.pusher = new Pusher('fadf6cd4da94a4717a3d', {
         cluster: 'ap2',
         encrypted: true
      });
      this.eventsChannel = this.pusher.subscribe('events');
      this.leadsChannel = this.pusher.subscribe('leads');
   }
   /** getting notification count from notification */
   public getNotificationCount(count): void {
      this.notificationCount = count;
   }
}
