import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CommunitySpotComponent} from './community-spot.component';
import {SharedModule} from "../shared/shared.module";
import {GooglePlaceModule} from "ngx-google-places-autocomplete-esb";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {GoogleMapsModule} from "@angular/google-maps";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {CommunitySpotRoutingModule} from "./community-spot-routing.module";


@NgModule({
  declarations: [
    CommunitySpotComponent
  ],
  imports: [
    SharedModule,
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
    CommunitySpotRoutingModule,
    MatOptionModule,
  ],
  exports: [
    CommunitySpotComponent
  ]
})
export class CommunitySpotModule {
}
