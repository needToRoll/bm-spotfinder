import {Component, Input, OnInit} from '@angular/core';
import {SurfSpot} from "../model/SurfSpot";
import {DistanceMatrixService} from "../service/distance/distance-matrix.service";

@Component({
  selector: 'app-surfspot-item',
  templateUrl: './surfspot-item.component.html',
  styleUrls: ['./surfspot-item.component.css']
})
export class SurfspotItemComponent implements OnInit {

  @Input() surfspot: SurfSpot
  public panelOpenState: boolean

  constructor(private distanceService: DistanceMatrixService) { }

  ngOnInit(): void {
  }

  public ensureOpenState() {
    this.panelOpenState = true
  }

  public forceClose() {
    this.panelOpenState = false
  }

  getSpotTitleText(spot: SurfSpot): string {
    return this.distanceService.getDisplayTitleIncludingDistance(spot);
  }
}
