import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunitySpotComponent } from './community-spot.component';
import {SharedModule} from "../shared/shared.module";



@NgModule({
  declarations: [
    CommunitySpotComponent
  ],
  imports: [
    SharedModule,
    CommonModule
  ],
  exports: [
    CommunitySpotComponent
  ]
})
export class CommunitySpotModule { }
