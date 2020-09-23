import { Component, Injector } from '@angular/core'
import { AbpSessionService } from 'abp-ng2-module'
import { AppComponentBase } from '@shared/app-component-base'
import { accountModuleAnimation } from '@shared/animations/routerTransition'
import { AppAuthService } from '../../shared/guards/app-auth.service'
import { ExternalAuthenticateModel } from '../../shared/service-proxies/service-proxies'
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService
} from 'angularx-social-login'

@Component({
  templateUrl: './login.component.html',
  animations: [accountModuleAnimation()]
})
export class LoginComponent extends AppComponentBase {
  submitting = false

  constructor(
    injector: Injector,
    public authService: AppAuthService,
    private _sessionService: AbpSessionService,
    private _socialAuthService: SocialAuthService
  ) {
    super(injector)
  }

  login(): void {
    this.submitting = true
    this.authService.authenticate(() => (this.submitting = false))
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
