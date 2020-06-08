import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@/_services';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { auth, commonInfo } from '@/_config/config'


@Component({
  selector: 'app-reset',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class ResetPasswordComponent implements OnInit {
  confirmForm: FormGroup;
  token: string;
  resetConfigTxt = {
    commonLb: commonInfo.commonFormLabels,
    errorTxt: commonInfo.errorTxt,
    backToLogin: auth.backToLogin,
    resetPwd: auth.resetPwd
  }

	/**
	 * Constructor
	 *
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {Title} _titleService
	 * @param {FormBuilder} _formBuilder
	 */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _titleService: Title,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private _router: Router,
    private _authService: AuthenticationService,
    private shared: SharedFunctions
  ) {
    // Configure the layout	
    this._fuseConfigService.config = this.shared.fuseConfig();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get("reset");
    this._titleService.setTitle(`Confirm Password - Charcoal`);
    this.confirmForm = this._formBuilder.group({
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]]
    });
    this._authService.getResetPasswordToken(this.token).subscribe(
      (response) => {
      },
      () => {
        this._router.navigate(['/auth/login']);
      });
  }

  setPassword(): void {
    this.confirmForm.value.token = this.token;
    this._authService.setAgentPassword(this.confirmForm.value).subscribe((res) => {
      this.shared._snackbarMessage(res.message, 2000)
        .afterDismissed()
        .subscribe(() => {
          this._router.navigate(['/login']);
        });
    },
      () => {

      });
  }
}
/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};
