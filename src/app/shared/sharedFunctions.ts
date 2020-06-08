import { MatSnackBarRef, SimpleSnackBar, MatSnackBar, MatDialog, MatDialogRef } from "@angular/material";
import { Injectable } from "@angular/core";
import { FuseConfigService } from "@fuse/services/config.service";

@Injectable({
   providedIn: 'root'
})

export class SharedFunctions {
   public days: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

   constructor(public snackBar: MatSnackBar,
      private _matDialog: MatDialog,
      private _fuseConfigService: FuseConfigService) { }

   public _snackbarMessage(message: string, duration: number): MatSnackBarRef<SimpleSnackBar> {
      const dialog = this.snackBar.open(message, '', {
         duration: duration
      });
      return dialog;
   }

   public modalPopup(component, width, data): MatDialogRef<any> {
      const dialogRef = this._matDialog.open(component,
         {
            width: width,
            data: data
         });
      return dialogRef;
   }

   public fuseConfig(): FuseConfigService {
      this._fuseConfigService.config = {
         layout: {
            navbar: {
               hidden: true
            },
            toolbar: {
               hidden: true
            },
            footer: {
               hidden: true
            },
            sidepanel: {
               hidden: true
            }
         }
      };
      return this._fuseConfigService.config;
   }

   public _keyPress(event: any): void {
      const pattern = /[0-9]/;
      const inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
         event.preventDefault();
      }
   }
}