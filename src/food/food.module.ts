import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http'
import { SharedModule } from '../shared/shared.module'
import { ServiceProxyModule } from '../shared/service-proxies/service-proxy.module'
import { ModalModule } from 'ngx-bootstrap/modal'
import { FoodRoutingModule } from './food-routing.module'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatInputModule } from '@angular/material/input'
import { MatSliderModule } from '@angular/material/slider'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { TooltipModule } from 'ngx-bootstrap/tooltip'
import { FoodFooterComponent } from './components/footer/food-footer.component'
import { FoodHomeComponent } from './components/home/food-home.component'
import { NgModule } from '@angular/core'
import { FoodHomeSearchSectionComponent } from './sections/address-search/food-home-search-section.component'
import { FoodHeaderComponent } from './components/header/food-header.component'
import { FoodComponent } from './food.component'
import { FoodOrderComponent } from './components/order/food-order.component'
import { FoodAddressSearchService } from './services/address-search/food-address-search.service'
import { FoodCitiesService } from './services/cities/food-cities-service.service'
import { HowToSectionComponent } from './sections/how-to/howto.component'
import { PopularSectionComponent } from './sections/popular/popular.component'
import { DeliveryMapSectionComponent } from './sections/delivery-map/map.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    SharedModule,
    ServiceProxyModule,
    ModalModule.forChild(),
    FoodRoutingModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatGoogleMapsAutocompleteModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    TooltipModule.forRoot(),
  ],
  declarations: [
    FoodFooterComponent,
    FoodHomeComponent,
    FoodHeaderComponent,
    FoodOrderComponent,
    FoodComponent,
    //sections
    HowToSectionComponent,
    PopularSectionComponent,
    DeliveryMapSectionComponent,
    FoodHomeSearchSectionComponent,
  ],
  providers: [FoodAddressSearchService, FoodCitiesService],
  entryComponents: [],
})
export class FoodModule {}
