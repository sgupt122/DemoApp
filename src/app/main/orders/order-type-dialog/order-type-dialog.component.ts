import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { order } from '@/_config/config';
import { IOrderType } from '@/_interfaces';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { NavigationService } from '@/_services';

@Component({
	selector: 'app-order-type-dialog',
	templateUrl: './order-type-dialog.component.html',
	styleUrls: ['./order-type-dialog.component.scss']
})
export class OrderTypeDialogComponent implements OnInit {
	public orderTypeText = {
		commonLb: order.orderType
	};
	public isOrderTypeShow: any;
	public filterdata : IOrderType[];
	/**
	 * Constructor
	 *
	 * @param {MatDialogRef} dialogRef
	 * @param {Inject} data
	 */
	constructor(
		public dialogRef: MatDialogRef<OrderTypeDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IOrderType[],
		private navigationService: NavigationService
	) { }


	ngOnInit(): void {
		this.navigationService.getSingleNavigation().subscribe(obj => {
			this.isOrderTypeShow = obj["data"][0]["navigation"]["order-types"];
			
		})
	}

	/** On order type click */
	public onOrderTypeClick(orderTypeID: number): void {
		this.dialogRef.close(orderTypeID);
	}

	public drop(event: CdkDragDrop<any>): void{
		moveItemInArray(this.data, event.previousIndex, event.currentIndex);
	}

	setDefaultType(){
		this.dialogRef.close();
	}

	saveNewType(){
		
	}
}
