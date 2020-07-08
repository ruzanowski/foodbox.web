import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FoodFooterComponent} from './components/food-footer/food-footer.component';
import {FoodHomeComponent} from './components/food-home/food-home.component';
import {FoodMapComponent} from './components/food-map/food-map.component';
import {FoodHomeSearchComponent} from './components/food-home-search/food-home-search.component';
import {FoodMapCoreComponent} from './components/food-map-core/food-map-core.component';
import {FoodHeaderComponent} from './components/food-header/food-header.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AgmCoreModule} from '@agm/core';
import {MatGoogleMapsAutocompleteModule} from '@angular-material-extensions/google-maps-autocomplete';
import {FoodAddressSearchService} from './services/food-address-search/food-address-search.service';
import {ServiceProxyModule} from '../shared/service-proxies/service-proxy.module';
import {SharedModule} from '../shared/shared.module';
import {FoodComponent} from './food.component';
import {FoodRoutingModule} from './food-routing.module';

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
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDeejy3R1kFaUzpw878VqntQmdHOeqCq9U',
            libraries: ['places'],
            language: localStorage && localStorage.gml || 'pl',
            region: 'pl'
        }),
        MatGoogleMapsAutocompleteModule
    ],
    declarations: [
        FoodFooterComponent,
        FoodHomeComponent,
        FoodMapComponent,
        FoodHomeSearchComponent,
        FoodMapCoreComponent,
        FoodHomeComponent,
        FoodHeaderComponent,
        FoodFooterComponent,
        FoodComponent
    ],
    providers: [FoodAddressSearchService],
    entryComponents: [
    ]
})
export class FoodModule {
}
