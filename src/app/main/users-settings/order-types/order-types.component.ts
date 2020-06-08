import { Component, OnInit } from '@angular/core';
import { NavigationService, AuthenticationService } from '@/_services';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { UserRoles } from '@/main/auth/register/register.component';

@Component({
  selector: 'app-order-types',
  templateUrl: './order-types.component.html',
  styleUrls: ['./order-types.component.scss']
})
export class OrderTypesComponent implements OnInit {

  public userRoles: Array<UserRoles> = [];
  public userRoleOptions: {};
  public userRoleOptionArray = [];
  public isSaveBtnDisabled: boolean;
  
  constructor(
      private _navigationService: NavigationService,
      private _authenticationService: AuthenticationService,
      private shared: SharedFunctions,
  ) { }

  ngOnInit() : void {
    this._authenticationService.getRoles().subscribe(response => {
      this.userRoles = JSON.parse(JSON.stringify(response.data));
    });
    this._navigationService.getNavigation().subscribe(res => {
      this.userRoleOptionArray = res['data']['navigations'];
    })
    this.isSaveBtnDisabled = true;

  }

  public addRoleType(roleId): void {
    this.userRoleOptions = this.userRoleOptionArray.find(userRoleOption => userRoleOption['role_id'] === +roleId);
  }


  public roleOptionSelected(checked, option): void {
    this.isSaveBtnDisabled = false;
      if (checked) {
        this.userRoleOptions['navigation']['order-types'][option.key] = true;
      } else {
        this.userRoleOptions['navigation']['order-types'][option.key] = false;
      }
  }

  public onSubmit(): void {
    const role_id = this.userRoleOptions['role_id'];
    const navigation = this.userRoleOptions['navigation'];
    this._navigationService.updateSingleNavigation(role_id, navigation).subscribe(res => {
      this.shared._snackbarMessage('Success!', 2000);
      this.isSaveBtnDisabled = true;
    }, err => {
      this.shared._snackbarMessage('Failed! Please try again..', 2000);
    });
  }
}
