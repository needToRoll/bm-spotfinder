import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {CommunitySpotModule} from "./community-spot.module";

const routes: Routes = [
  {path: '', component: CommunitySpotModule}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class CommunitySpotRoutingModule {
}

