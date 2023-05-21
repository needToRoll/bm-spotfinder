import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitySpotComponent } from './community-spot.component';
import {SharedModule} from "../shared/shared.module";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {GoogleMapsModule} from "@angular/google-maps";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";



@NgModule({
  declarations: [
    CommunitySpotComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
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
  ],
  exports: [
    CommunitySpotComponent
  ]
})
export class CommunitySpotModule { }
