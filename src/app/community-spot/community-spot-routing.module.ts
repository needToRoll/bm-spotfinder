import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunitySpotComponent } from './community-spot.component';

const routes: Routes = [{ path: '', component: CommunitySpotComponent }];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunitySpotRoutingModule {}
