import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ILead } from '@/_interfaces';
import { SharedFunctions } from '@/shared/sharedFunctions';

@Component({
	selector: 'app-disposition-dialog',
	templateUrl: './disposition-dialog.component.html',
	styleUrls: ['./disposition-dialog.component.scss']
})
export class DispositionDialogComponent implements OnInit {
	@Input() public selectedLead: ILead;
	@Input() public lead: ILead;

	constructor(public dialog: MatDialog, private shared: SharedFunctions) { }

	public ngOnInit(): void { }

	public disposition(): void {
		this.shared.modalPopup(DispositionDialogComponent, '', this.selectedLead);
	}
}
