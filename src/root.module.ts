import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { ModalModule } from 'ngx-bootstrap/modal'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { CollapseModule } from 'ngx-bootstrap/collapse'
import { TabsModule } from 'ngx-bootstrap/tabs'

import { AbpHttpInterceptor } from 'abp-ng2-module'

import { SharedModule } from '@shared/shared.module'
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module'
import { RootRoutingModule } from './root-routing.module'
import { AppConsts } from '@shared/AppConsts'
import { API_BASE_URL } from '@shared/service-proxies/service-proxies'

import { RootComponent } from './root.component'
import { AgmCoreModule } from '@agm/core'
import { MAT_DATE_LOCALE } from '@node_modules/@angular/material/core'
import { AppInitializer } from './app-initializer'
import { FormsModule, ReactiveFormsModule } from '@node_modules/@angular/forms'
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@node_modules/@angular/material/dialog'

export function getCurrentLanguage(): string {
  if (abp.localization.currentLanguage.name) {
    return abp.localization.currentLanguage.name
  }

  // todo: Waiting for https://github.com/angular/angular/issues/31465 to be fixed.
  return 'pl'
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule.forRoot(),
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    ServiceProxyModule,
    RootRoutingModule,
    AgmCoreModule.forRoot(),
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    FormsModule
  ],
  declarations: [RootComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AbpHttpInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: (appInitializer: AppInitializer) => appInitializer.init(),
      deps: [AppInitializer],
      multi: true
    },
    { provide: API_BASE_URL, useFactory: () => AppConsts.remoteServiceBaseUrl },
    {
      provide: LOCALE_ID,
      useFactory: getCurrentLanguage
    },
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }
  ],
  bootstrap: [RootComponent]
})
export class RootModule {}
