import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {GoogleMapsModule} from "@angular/google-maps";
import {CommonModule} from "@angular/common";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {SearchbarComponent} from './map/searchbar/searchbar.component';
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {GooglePlaceModule} from "ngx-google-places-autocomplete";
import {SurfspotListComponent} from './surfspot-list/surfspot-list.component';
import {SurfspotItemComponent} from './surfspot-list/surfspot-item/surfspot-item.component';
import {MatListModule} from "@angular/material/list";
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SearchbarComponent,
    SurfspotListComponent,
    SurfspotItemComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    GooglePlaceModule,
    MatSelectModule,
    MatOptionModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:20000'
    }),
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
