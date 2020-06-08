import { Component, ViewEncapsulation, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { IUser } from '@/_interfaces';
import { LocalStorage } from 'ngx-webstorage';
import { NotificationService } from '@/_services/notification.service';
import { Router } from '@angular/router';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { LeadDetailsComponent } from '@/main/leads/lead-details/lead-details.component';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { navigationPanel } from '@/_config/config';
@Component({
	selector: 'notification-panel',
	templateUrl: './notification-panel.component.html',
	styleUrls: ['./notification-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class NotificationPanelComponent {
	@LocalStorage() public user: IUser;
	// @Output() private notificationCount = new EventEmitter();
	date: Date;
	events: any[] = [];
	settings: any;
	public leads = [];
	// Private
	private eventIds = [];
	private _unsubscribeAll: Subject<any>;
	public navigationConfigTxt = navigationPanel;
	/**
	 * Constructor
	 *
	 * @param {HttpClient} _httpClient
	 */
	constructor(private _httpClient: HttpClient, private _notificationService: NotificationService, private router: Router,
		private _fuseSidebarService: FuseSidebarService, private shared: SharedFunctions) {
		// Set the defaults
		this.date = new Date();
		this.settings = {
			notify: true,
			cloud: false,
			retro: true
		};
		// Set the private defaults
		this._unsubscribeAll = new Subject();
	}

	ngOnInit(): void {
		// Subscribe to the events
		// this._httpClient
		// 	.get('api/quick-panel-events')
		// 	.pipe(takeUntil(this._unsubscribeAll))
		// 	.subscribe((response: any) => {
		// 		this.events = response;
		// 	});

		// // Subscribe to the notes
		// this._httpClient
		// 	.get('api/quick-panel-notes')
		// 	.pipe(takeUntil(this._unsubscribeAll))
		// 	.subscribe((response: any) => {
		// 		this.notes = response;
		// 	});
		// console.log(this.notes);

		this._notificationService.eventsChannel.bind('events', allEvents => {
			if (allEvents.length > 0) {
				this.events = [];
				allEvents.map(event => {
					if (event) {
						if (this.eventIds.length > 0) {
							const index = this.eventIds.findIndex(elem => elem === event.id);
							if (index === -1) {
								if (this.user.id === event.user_id) {
									this.events.push(event);
								}
							}
						} else {
							if (this.user.id === event.user_id) {
								this.events.push(event);
							}
						}
					}
				});
			}
			this._notificationService.getNotificationCount(this.events.length);
		});

		this._notificationService.leadsChannel.bind('leads', allLeads => {
			allLeads.map(lead => {
				this.leads.push(lead);
			});
			this._notificationService.getNotificationCount(this.events.length + this.leads.length);
		});
	}
	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	public eventClick(event): void {
		this.events.map((value, index) => {
			if (event.id === value.id) {
				this.eventIds.push(event.id);
				this.events.splice(index, 1);
			}
		});
		this._notificationService.getNotificationCount(this.events.length + this.leads.length);
		this.router.navigate(['/calendar']);
		this._fuseSidebarService.getSidebar('notificationPanel').close();
	}

	public leadClick(lead): void {
		this.shared.modalPopup(LeadDetailsComponent, '600px', lead);
	}

	public viewAllLeads(): void {
		this.router.navigate(['/leads']);
		this._fuseSidebarService.getSidebar('notificationPanel').close();
	}

	public viewAllEvents(): void {
		this.router.navigate(['/calendar']);
		this._fuseSidebarService.getSidebar('notificationPanel').close();
	}
}
