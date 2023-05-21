import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {TranslateModule} from "@ngx-translate/core";
import {MatLegacyOptionModule as MatOptionModule} from "@angular/material/legacy-core";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {GooglePlaceModule} from "ngx-google-places-autocomplete-esb";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {SharedModule} from "../shared/shared.module";



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
    TranslateModule,
    MatOptionModule,
    MatCardModule,
    SharedModule
  ]
})
export class MapModule { }
