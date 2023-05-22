import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MapComponent} from "./map/map.component";
import {CommunitySpotComponent} from "./community-spot/community-spot.component";
import {ContactComponent} from "./contact/contact.component";
import {MapModule} from "./map/map.module";
import {ContactModule} from "./contact/contact.module";
import {CommunitySpotModule} from "./community-spot/community-spot.module";

const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'recommend', component: CommunitySpotComponent},
  { path: 'contact', component: ContactComponent},
  { path: '', redirectTo: 'map', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    MapModule,
    CommunitySpotModule,
    ContactModule,
  ]
})
export class AppRoutingModule { }
