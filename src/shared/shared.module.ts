import { CommonModule } from '@angular/common'
import { NgModule, ModuleWithProviders } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgxPaginationModule } from 'ngx-pagination'

import { AppSessionService } from './session/app-session.service'
import { AppUrlService } from './nav/app-url.service'
import { LocalizePipe } from '@shared/pipes/localize.pipe'

import { AbpPaginationControlsComponent } from './components/pagination/abp-pagination-controls.component'
import { AbpValidationSummaryComponent } from './components/validation/abp-validation.summary.component'
import { AbpModalHeaderComponent } from './components/modal/abp-modal-header.component'
import { AbpModalFooterComponent } from './components/modal/abp-modal-footer.component'
import { LayoutStoreService } from './layout/layout-store.service'

import { BusyDirective } from './directives/busy.directive'
import { EqualValidator } from './directives/equal-validator.directive'
import { AppAuthService } from '@shared/guards/app-auth.service'
import { AppRouteGuard } from '@shared/guards/auth-route-guard'
import { AppPreloader } from '@shared/helpers/AppPreloader'
import { MatDialogModule } from '@node_modules/@angular/material/dialog'

@NgModule({
  imports: [CommonModule, RouterModule, NgxPaginationModule, MatDialogModule],
  declarations: [
    AbpPaginationControlsComponent,
    AbpValidationSummaryComponent,
    AbpModalHeaderComponent,
    AbpModalFooterComponent,
    LocalizePipe,
    BusyDirective,
    EqualValidator
  ],
  exports: [
    AbpPaginationControlsComponent,
    AbpValidationSummaryComponent,
    AbpModalHeaderComponent,
    AbpModalFooterComponent,
    LocalizePipe,
    BusyDirective,
    EqualValidator
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AppSessionService,
        AppUrlService,
        AppAuthService,
        AppRouteGuard,
        LayoutStoreService,
        AppPreloader
      ]
    }
  }
}
