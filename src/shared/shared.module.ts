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
import {
  MAT_RADIO_DEFAULT_OPTIONS,
  MatRadioModule
} from '@node_modules/@angular/material/radio'
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule
} from '@node_modules/@angular/material/core'
import { FoodMenuDialogSectionComponent } from '@shared/components/modal/food-menu-dialog/food-menu-dialog.component'
import { MatFormFieldModule } from '@node_modules/@angular/material/form-field'
import { MatSelectModule } from '@node_modules/@angular/material/select'
import { MatDatepickerModule } from '@node_modules/@angular/material/datepicker'
import { MatSlideToggleModule } from '@node_modules/@angular/material/slide-toggle'
import { FormsModule, ReactiveFormsModule } from '@node_modules/@angular/forms'
import { MatInputModule } from '@node_modules/@angular/material/input'
import { MatAutocompleteModule } from '@node_modules/@angular/material/autocomplete'
import { MatSliderModule } from '@node_modules/@angular/material/slider'
import { MatCheckboxModule } from '@node_modules/@angular/material/checkbox'
import { MatTooltipModule } from '@node_modules/@angular/material/tooltip'
import { MatIconModule } from '@node_modules/@angular/material/icon'
import { MatButtonModule } from '@node_modules/@angular/material/button'
import { TooltipModule } from '@node_modules/ngx-bootstrap/tooltip'
import { MatCardModule } from '@node_modules/@angular/material/card'
import {
  _MatMenuDirectivesModule,
  MatMenuModule
} from '@node_modules/@angular/material/menu'
import { AdminModule } from '../admin/admin.module'
import { SuffixPipe } from '@shared/pipes/suffix.pipe'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSliderModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    TooltipModule.forRoot(),
    MatNativeDateModule,
    MatCardModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MatRadioModule,
    MatSlideToggleModule,
    FormsModule
  ],
  declarations: [
    AbpPaginationControlsComponent,
    AbpValidationSummaryComponent,
    AbpModalHeaderComponent,
    AbpModalFooterComponent,
    FoodMenuDialogSectionComponent,
    LocalizePipe,
    SuffixPipe,
    BusyDirective,
    EqualValidator
  ],
  exports: [
    AbpPaginationControlsComponent,
    AbpValidationSummaryComponent,
    AbpModalHeaderComponent,
    AbpModalFooterComponent,
    LocalizePipe,
    SuffixPipe,
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
        AppPreloader,
        {
          provide: MAT_RADIO_DEFAULT_OPTIONS,
          useValue: { color: 'accent' }
        },
        { provide: MAT_DATE_LOCALE, useValue: 'pl' }
      ]
    }
  }
}
