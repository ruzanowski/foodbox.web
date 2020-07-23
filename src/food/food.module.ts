import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
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
import { FoodHeaderComponent } from './components/header/food-header.component'
import { FoodComponent } from './food.component'
import { AddressSearchService } from './services/address-search/address-search.service'
import { FoodItemsComponent } from './components/order/1-items/food-items.component'
import { HowToSectionComponent } from './components/home/sections/how-to/howto.component'
import { PopularSectionComponent } from './components/home/sections/popular/popular.component'
import { DeliveryMapSectionComponent } from './components/home/sections/delivery-map/map.component'
import { HomeSearchSectionComponent } from './components/home/sections/address-search/home-search-section.component'
import { ItemsMainMenuSectionComponent } from './components/order/1-items/sections/main-menu/items-main-menu-section.component'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatCardModule } from '@angular/material/card'
import { _MatMenuDirectivesModule, MatMenuModule } from '@angular/material/menu'
import { CaloriesDialogSectionComponent } from './components/order/1-items/sections/calories-dialog/calories-dialog.component'
import { MatDialogModule } from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select'
import { BasketService } from './services/basket-service/basket.service'
import { ItemsService } from './services/items-service/items.service'
import { FoodOrderComponent } from './components/order/2-personal-details/food-order.component'
import { BasketSectionComponent } from './components/order/sections/basket/basket-section.component'
import { OrderHeaderSectionComponent } from './components/order/sections/header/order-header-section.component'
import { CitiesService } from './services/cities/cities-service.service'

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
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FoodFooterComponent,
    FoodHomeComponent,
    FoodHeaderComponent,
    FoodOrderComponent,
    FoodComponent,
    FoodItemsComponent,
    //sections
    HowToSectionComponent,
    PopularSectionComponent,
    DeliveryMapSectionComponent,
    HomeSearchSectionComponent,
    BasketSectionComponent,
    OrderHeaderSectionComponent,
    ItemsMainMenuSectionComponent,
    CaloriesDialogSectionComponent,
  ],
  providers: [AddressSearchService, CitiesService, BasketService, ItemsService],
  entryComponents: [],
})
export class FoodModule {}
