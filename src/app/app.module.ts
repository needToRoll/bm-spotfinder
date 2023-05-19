import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HttpClient, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
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
import {MatListModule} from "@angular/material/list";
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {MatExpansionModule} from "@angular/material/expansion";
import {SurfspotItemComponent} from "./surfspot-item/surfspot-item.component";
import {SpotIconAttributeComponent} from "./surfspot-item/spot-icon-attribute/spot-icon-attribute.component";
import { SpotDetailsComponent } from './spot-details/spot-details.component';
import { MobileSpotInfoSheetComponent } from './mobile-spot-info-sheet/mobile-spot-info-sheet.component';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from "@angular/material/bottom-sheet";
import { WaterLevelAttributeComponent } from './surfspot-item/water-level-attribute/water-level-attribute.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatCardModule} from "@angular/material/card";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatMenuModule} from "@angular/material/menu";
import '@angular/common/locales/global/de-CH';
import { LocalizedDatePipe } from './pipe/localized-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    SearchbarComponent,
    SurfspotListComponent,
    SurfspotItemComponent,
    SpotIconAttributeComponent,
    SpotDetailsComponent,
    MobileSpotInfoSheetComponent,
    WaterLevelAttributeComponent,
    SidenavComponent,
    LocalizedDatePipe,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NoopAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirestore(() => getFirestore()),
    MatExpansionModule,
    MatCardModule,
    MatSidenavModule,
    MatMenuModule,
  ],
  providers: [
    { provide: MatBottomSheet },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
  ],

  bootstrap: [AppComponent]
})
export class AppModule {

}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
