import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { calendar } from '@/_config/config';
@Component({
  selector: 'app-export-event-type',
  templateUrl: './export-event-type.component.html',
  styleUrls: ['./export-event-type.component.scss']
})
export class ExportEventTypeComponent implements OnInit {

  public exportTypeConfig = {
    selectMsg: calendar.exportType.selectMsg,
    excel: calendar.exportType.excel,
    ics: calendar.exportType.ics
  }

  /**
   * Constructor
   *
   * @param {MatDialogRef} dialogRef
   */
  constructor(
    public dialogRef: MatDialogRef<ExportEventTypeComponent>
  ) { }

  ngOnInit(): void {
  }

  public OnExportType(exportType: string): void {
    if (exportType) {
      this.dialogRef.close(exportType);
    }
  }
}
