import {Component, Input, OnInit} from '@angular/core';
import {SurfSpot} from "../model/SurfSpot";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-surfspot-item',
  templateUrl: './surfspot-item.component.html',
  styleUrls: ['./surfspot-item.component.css']
})
export class SurfspotItemComponent implements OnInit {

  @Input() surfspot: SurfSpot
  public panelOpenState: boolean

  constructor() { }

  ngOnInit(): void {
  }

  public ensureOpenState() {
    this.panelOpenState = true
  }

  public forceClose() {
    this.panelOpenState = false
  }

}
