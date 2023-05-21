import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {HttpClient, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {CommonModule} from "@angular/common";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {AngularFireModule} from "@angular/fire/compat";
import {MatExpansionModule} from "@angular/material/expansion";
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheet} from "@angular/material/bottom-sheet";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import '@angular/common/locales/global/de-CH';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from "@angular/router";
import {ContactModule} from "./contact/contact.module";
import {MatLegacyDialogModule as MatDialogModule, MatLegacyDialogRef as MatDialogRef} from "@angular/material/legacy-dialog";

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
  ],
  imports: [
    MatAutocompleteModule,
    CommonModule,
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
    AppRoutingModule,
    RouterModule,
    MatDialogModule
  ],
  providers: [
    {provide: MatBottomSheet},
    { provide: MatDialogRef, useValue: {} },
    {provide: MAT_BOTTOM_SHEET_DATA, useValue: {}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
