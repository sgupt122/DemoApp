import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IClientDisposition, ILead } from '@/_interfaces';
import { CallDialogComponent } from '@/main/leads/leads-actions/call-dialog/call-dialog.component';
import { TextDialogComponent } from '@/main/leads/leads-actions/text-dialog/text-dialog.component';
import { EmailDialogComponent } from '@/main/leads/leads-actions/email-dialog/email-dialog.component';
import { DispositionDialogComponent } from '@/main/leads/leads-actions/disposition-dialog/disposition-dialog.component';
import { SharedFunctions } from '@/shared/sharedFunctions';

@Component({
	selector: 'app-leads-actions',
	templateUrl: './leads-actions.component.html',
	styleUrls: ['./leads-actions.component.scss']
})
export class LeadsActionsComponent implements OnInit {
	@Input() public selectedLead: ILead;
	@Input() public lead: ILead;
	@Input() public clientDispositions: IClientDisposition[];
	@Input() public leadFilters;
	@Input() public isAction;
	@Output() public dispositionUpdated = new EventEmitter<{ lead: ILead; client_disposition_id: number }>();

	constructor(private shared: SharedFunctions) { }

	public ngOnInit(): void { }

	public call(): void {
		this.shared.modalPopup(CallDialogComponent, '', this.selectedLead);
	}

	public disposition(): void {
		this.shared.modalPopup(DispositionDialogComponent, '', { lead: this.selectedLead, clientDispositions: this.clientDispositions })
			.afterClosed()
			.subscribe((updated: boolean) => {
				if (updated) {
					this.dispositionUpdated.emit(this.leadFilters);
				}
			});
	}

	public email(): void {
		this.shared.modalPopup(EmailDialogComponent, '', this.selectedLead);
	}

	public text(): void {
		this.shared.modalPopup(TextDialogComponent, '', this.selectedLead);
	}
}
