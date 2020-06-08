import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FormRequestComponent } from './form-request.component';

@NgModule({
	declarations: [FormRequestComponent],
	exports: [FormRequestComponent],
	imports: [CommonModule, MatProgressSpinnerModule, FlexLayoutModule]
})
export class FormRequestModule {}
