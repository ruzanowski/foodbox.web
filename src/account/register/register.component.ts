import { Component, Injector } from '@angular/core'
import { Router } from '@angular/router'
import { finalize } from 'rxjs/operators'
import { AppComponentBase } from '@shared/app-component-base'
import {
    AccountServiceProxy, ExternalAuthenticateModel,
    RegisterInput,
    RegisterOutput
} from '@shared/service-proxies/service-proxies';
import { accountModuleAnimation } from '@shared/animations/routerTransition'
import { AppAuthService } from '../../shared/guards/app-auth.service'
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {AbpSessionService} from 'abp-ng2-module';

@Component({
  templateUrl: './register.component.html',
  animations: [accountModuleAnimation()]
})
export class RegisterComponent extends AppComponentBase {
  model: RegisterInput = new RegisterInput()
  saving = false
  submitting = false

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _router: Router,
    private authService: AppAuthService,
    private _sessionService: AbpSessionService,
    private _socialAuthService: SocialAuthService
  ) {
    super(injector)
  }

  save(): void {
    this.saving = true
    this._accountService
      .register(this.model)
      .pipe(
        finalize(() => {
          this.saving = false
        })
      )
      .subscribe((result: RegisterOutput) => {
        if (!result.canLogin) {
          this.notify.success(this.l('SuccessfullyRegistered'))
          this._router.navigate(['/login'])
          return
        }

        // Autheticate
        this.saving = true
        this.authService.authenticateModel.userNameOrEmailAddress = this.model.userName
        this.authService.authenticateModel.password = this.model.password
        this.authService.authenticate(() => {
          this.saving = false
        })
      })
  }

    loginWithFacebook(): void {
        this.submitting = true
        this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
        this._socialAuthService.authState.subscribe((user) => {
            this.authService.authenticateExternalModel = ExternalAuthenticateModel.fromJS(
                {
                    providerKey: user.id,
                    providerAccessCode: user.authToken,
                    authProvider: 'Facebook'
                }
            )
            this.authService.authenticateExternal(() => (this.submitting = false))
        })
    }

    loginWithGoogle(): void {
        this.submitting = true
        this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
        this._socialAuthService.authState.subscribe((user) => {
            this.authService.authenticateExternalModel = ExternalAuthenticateModel.fromJS(
                {
                    providerKey: user.id,
                    providerAccessCode: user.id,
                    authProvider: 'Google'
                }
            )
            this.authService.authenticateExternal(() => (this.submitting = false))
        })
    }
}
