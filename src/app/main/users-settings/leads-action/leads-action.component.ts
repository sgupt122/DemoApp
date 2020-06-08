import { Component, OnInit } from '@angular/core';
import { UserRoles } from '@/main/auth/register/register.component';
import { NavigationService, AuthenticationService } from '@/_services';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Component({
  selector: 'app-leads-action',
  templateUrl: './leads-action.component.html',
  styleUrls: ['./leads-action.component.scss']
})
export class LeadsActionComponent implements OnInit {

  public userRoles: Array<UserRoles> = [];
  public userRoleOptions: {};
  public userRoleOptionArray = [];
  public isSaveBtnDisabled: boolean;
  public isAction: boolean = false;
  constructor(
    private _navigationService: NavigationService,
    private _authenticationService: AuthenticationService,
    private shared: SharedFunctions,
  ) { }

  ngOnInit(): void {
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
    if (this.userRoleOptions['navigation']['leads-action']['isAction'] === true) {
      this.isAction = true;
    }
  }

  public ActionSelected(checked): void{
    this.userRoleOptions['navigation']['leads-action']['isAction'] = checked ? this.isAction = true : this.isAction = false;
    this.userRoleOptions['navigation']['leads-action']['isAction'] = checked ? true : false;
    this.isSaveBtnDisabled = false;
  }

  public roleOptionSelected(checked, option): void {
    this.isSaveBtnDisabled = false;
    if (this.isAction){
      if (checked) {
        this.userRoleOptions['navigation']['leads-action']['options'][option.key] = true;
      } else {
        this.userRoleOptions['navigation']['leads-action']['options'][option.key] = false;
      }
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
