import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SurfspotListComponent} from './surfspot-list/surfspot-list.component';
import {MapComponent} from "./map.component";
import {MobileSpotInfoSheetComponent} from "./mobile-spot-info-sheet/mobile-spot-info-sheet.component";
import {SearchbarComponent} from "./searchbar/searchbar.component";
import {SurfspotItemComponent} from "./surfspot-item/surfspot-item.component";
import {SpotIconAttributeComponent} from "./surfspot-item/spot-icon-attribute/spot-icon-attribute.component";
import {WaterLevelAttributeComponent} from "./surfspot-item/water-level-attribute/water-level-attribute.component";
import {GoogleMapsModule} from "@angular/google-maps";
import {MatExpansionModule} from "@angular/material/expansion";
import {SpotDetailsComponent} from "./spot-details/spot-details.component";
import {MatButtonModule as MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule as MatInputModule} from "@angular/material/input";
import {MatListModule as MatListModule} from "@angular/material/list";
import {MatOptionModule as MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule as MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule as MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {GooglePlaceModule} from "ngx-google-places-autocomplete-esb";
import {MatSelectModule as MatSelectModule} from "@angular/material/select";
import {MatCardModule as MatCardModule} from "@angular/material/card";
import {SharedModule} from "../shared/shared.module";

import {MapRoutingModule} from "./map-routing.module";


@NgModule({
  declarations: [
    SurfspotListComponent,
    MapComponent,
    MobileSpotInfoSheetComponent,
    SearchbarComponent,
    SurfspotItemComponent,
    SpotIconAttributeComponent,
    WaterLevelAttributeComponent,
    SpotDetailsComponent,
  ],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    MatSelectModule,
    GoogleMapsModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MapRoutingModule,
    MatOptionModule,
    MatCardModule,
    SharedModule
  ]
})
export class MapModule {
}
