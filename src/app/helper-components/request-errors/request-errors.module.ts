import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatListModule } from '@angular/material';

import { RequestErrorsComponent } from './request-errors.component';

@NgModule({
	declarations: [RequestErrorsComponent],
	exports: [RequestErrorsComponent],
	imports: [CommonModule, MatListModule, MatIconModule]
})
export class RequestErrorsModule {}
