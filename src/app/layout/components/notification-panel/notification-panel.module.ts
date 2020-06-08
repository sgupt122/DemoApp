import { NgModule } from '@angular/core';
import { MatDividerModule, MatListModule, MatSlideToggleModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { NotificationPanelComponent } from 'app/layout/components/notification-panel/notification-panel.component';
import { LeadsModule } from '@/main/leads/leads.module';
import { LeadDetailsComponent } from '@/main/leads/lead-details/lead-details.component';


@NgModule({
	declarations: [NotificationPanelComponent],
	imports: [MatDividerModule, MatListModule, MatSlideToggleModule, FuseSharedModule, LeadsModule],
	exports: [NotificationPanelComponent],
	entryComponents: [LeadDetailsComponent]
})
export class NotificationPanelModule { }
