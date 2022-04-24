import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Observable} from "rxjs";
import {SurfSpot} from "../model/SurfSpot";
import {SurfspotItemComponent} from "../surfspot-item/surfspot-item.component";
import {DeviceClassificationService} from "../service/device-classification.service";

@Component({
  selector: 'app-surfspot-list',
  templateUrl: './surfspot-list.component.html',
  styleUrls: ['./surfspot-list.component.css']
})
export class SurfspotListComponent implements OnInit {

  @Input() surfspots: Observable<SurfSpot[]>
  @Input() selectedSurfspot: Observable<SurfSpot>
  @Input() parentUsesBottomSheetFunction: () => boolean
  @ViewChildren(SurfspotItemComponent) items: QueryList<SurfspotItemComponent>

  constructor(private _deviceService: DeviceClassificationService) {
  }

  ngOnInit(): void {
    this.selectedSurfspot.subscribe(selected => {
        if (!this.parentUsesBottomSheetFunction()) {
          this.items.forEach(item => item.panelOpenState = item.surfspot.placeId == selected.placeId)
        }
      }
    )
  }

}
