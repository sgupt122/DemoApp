import { Component, OnInit } from '@angular/core';
import { NavigationService, AuthenticationService } from '@/_services';
import { UserRoles } from '@/main/auth/register/register.component';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { LocalStorage } from 'ngx-webstorage';
import { IUser } from '@/_interfaces';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.scss']
})
export class NavigationsComponent implements OnInit {

  @LocalStorage() user: IUser;
  public userRoles: Array<UserRoles> = [];
  public userRoleOptions: {};
  public isSaveBtnDisabled: boolean;


  public userRoleOptionArray = [];
  constructor(
    private _navigationService: NavigationService,
    private _authenticationService: AuthenticationService,
    private shared: SharedFunctions,
    private _fuseNavigationService: FuseNavigationService
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
  }

  public roleOptionSelected(checked, option): void {
    this.isSaveBtnDisabled = false;
    if (option.key === "reports") {
      if (checked) {
        this.userRoleOptions['navigation'][option.key] = { tablau: option.value.tablau, isreport: true };
      } else {
        this.userRoleOptions['navigation'][option.key] = { tablau: option.value.tablau, isreport: false };
      }
    }
    else {
      if (checked) {
        this.userRoleOptions['navigation'][option.key] = true;
      } else {
        this.userRoleOptions['navigation'][option.key] = false;
      }
    }
  }

  public onAllSelect(checked): void {
    this.isSaveBtnDisabled = false;
    Object.keys(this.userRoleOptions['navigation']).filter(key => {
      // this.userRoleOptions['navigation'][key] = checked;
      const value = this.userRoleOptions['navigation'][key];
      if (key === 'reports') {
        this.userRoleOptions['navigation'][key]['isreport'] = checked;
      }
      if (value === true || value === false) {
        this.userRoleOptions['navigation'][key] = checked;
      }
    })
  }

  public selectAllCheck(): boolean {
    for (const key in this.userRoleOptions['navigation']) {
      if (key === 'reports') {
        if (!this.userRoleOptions['navigation'][key]['isreport']) return false;
      } else {
        const value = this.userRoleOptions['navigation'][key];
        if (value === true || value === false) {
          if (!this.userRoleOptions['navigation'][key]) return false;
        }
      }
    }
    return true;
  }

  public onSubmit(): void {
    const role_id = this.userRoleOptions['role_id'];
    const navigation = this.userRoleOptions['navigation'];
    this._navigationService.updateSingleNavigation(role_id, navigation).subscribe(res => {
      this.shared._snackbarMessage('Success!', 2000);
      this.isSaveBtnDisabled = true;
      if (role_id === 1) {
        const updatedNavigation = this._navigationService.filterNavigation(navigation);
        this._fuseNavigationService.unregister('main');
        this._fuseNavigationService.register('main', updatedNavigation);
        this._fuseNavigationService.setCurrentNavigation('main');
      }
    }, err => {
      this.shared._snackbarMessage('Failed! Please try again..', 2000);
    });
  }
}
