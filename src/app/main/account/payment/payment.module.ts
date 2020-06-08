import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PaymentComponent } from '@/main/account/payment/payment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule, MatSelectModule, MatRadioModule, MatIconModule } from '@angular/material';
import { FuseSharedModule } from '@fuse/shared.module';

const routes: Routes = [
	{
		path: '',
		component: PaymentComponent
	}
];

@NgModule({
	declarations: [PaymentComponent],
	imports: [CommonModule,
		FuseSharedModule,
		RouterModule.forChild(routes),
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSnackBarModule,
		MatSelectModule,
		MatRadioModule,
		MatIconModule
	]
})
export class PaymentModule { }
