import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MapComponent} from "./map/map.component";
import {CommunitySpotComponent} from "./community-spot/community-spot.component";
import {ImprintComponent} from "./imprint/imprint.component";
import {MapModule} from "./map/map.module";


const routes: Routes = [
  { path: 'map', component: MapComponent },
  { path: 'recommend', component: CommunitySpotComponent},
  { path: 'imprint', component: ImprintComponent},
  { path: '', redirectTo: 'map', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule,
    MapModule
  ]
})
export class AppRoutingModule { }