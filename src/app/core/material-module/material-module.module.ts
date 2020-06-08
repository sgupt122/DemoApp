import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDividerModule,
  MatSelectModule,
  MatDialogModule,
} from '@angular/material';

export const MATERIAL_MODULE = [
  MatIconModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDividerModule,
  MatSelectModule,
  MatDialogModule,
  MatCardModule,
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MATERIAL_MODULE
  ],
  exports: [MATERIAL_MODULE]
})


export class CoreMaterialModule { }
