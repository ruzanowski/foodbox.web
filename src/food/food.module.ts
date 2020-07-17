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
import { FoodHeaderComponent } from './components/header/food-header.component'
import { FoodComponent } from './food.component'
import { FoodAddressSearchService } from './services/address-search/food-address-search.service'
import { FoodCitiesService } from './services/cities/food-cities-service.service'
import {FoodOrderComponent} from './components/order/2-sumup/food-order.component';
import {FoodItemsComponent} from './components/order/1-items/food-items.component';
import {HowToSectionComponent} from './components/home/sections/how-to/howto.component';
import {PopularSectionComponent} from './components/home/sections/popular/popular.component';
import {DeliveryMapSectionComponent} from './components/home/sections/delivery-map/map.component';
import {HomeSearchSectionComponent} from './components/home/sections/address-search/home-search-section.component';
import {ItemsOptionsSectionComponent} from './components/order/1-items/sections/options/items-options.component';
import {ItemsSidebarRightSectionComponent} from './components/order/1-items/sections/sidebar-right/items-sidebar-right-section.component';
import {ItemsSidebarLeftSectionComponent} from './components/order/1-items/sections/sidebar-left/items-sidebar-left-section.component';
import {ItemsHeaderSectionComponent} from './components/order/1-items/sections/header/items-header-section.component';
import {ItemsMainMenuSectionComponent} from './components/order/1-items/sections/main-menu/items-main-menu-section.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';

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
    ItemsOptionsSectionComponent,
    ItemsSidebarRightSectionComponent,
    ItemsSidebarLeftSectionComponent,
    ItemsHeaderSectionComponent,
    ItemsMainMenuSectionComponent
  ],
  providers: [FoodAddressSearchService, FoodCitiesService],
  entryComponents: [],
})
export class FoodModule {}
