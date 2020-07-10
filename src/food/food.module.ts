import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatSliderModule } from "@angular/material/slider";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { AgmCoreModule } from "@agm/core";
import { HttpClientJsonpModule } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "ngx-bootstrap/modal";
import { FoodComponent } from "./food.component";
import { FoodRoutingModule } from "./food-routing.module";
import { FoodFooterComponent } from "./components/food-footer/food-footer.component";
import { FoodHomeComponent } from "./components/food-home/food-home.component";
import { FoodHomeSearchComponent } from "./components/food-home-search/food-home-search.component";
import { FoodHeaderComponent } from "./components/food-header/food-header.component";
import { HowToSectionComponent } from "./components/sections/HowTo/howto.component";
import { PopularSectionComponent } from "./components/sections/Popular/popular.component";
import { DeliveryMapSectionComponent } from "./components/sections/DeliveryMap/map.component";
import { MapCoreComponent } from "./components/sections/DeliveryMap/map-core/map-core.component";
import { MatGoogleMapsAutocompleteModule } from "@angular-material-extensions/google-maps-autocomplete";
import { FoodAddressSearchService } from "./services/food-address-search/food-address-search.service";
import { ServiceProxyModule } from "../shared/service-proxies/service-proxy.module";
import { SharedModule } from "../shared/shared.module";

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
      apiKey: "AIzaSyDeejy3R1kFaUzpw878VqntQmdHOeqCq9U",
      libraries: ["places"],
      language: (localStorage && localStorage.gml) || "pl",
      region: "pl",
    }),
    MatGoogleMapsAutocompleteModule,
  ],
  declarations: [
    FoodFooterComponent,
    FoodHomeComponent,
    FoodHomeSearchComponent,
    FoodHeaderComponent,
    FoodComponent,
    HowToSectionComponent,
    PopularSectionComponent,
    DeliveryMapSectionComponent,
    MapCoreComponent,
  ],
  providers: [FoodAddressSearchService],
  entryComponents: [],
})
export class FoodModule {}
