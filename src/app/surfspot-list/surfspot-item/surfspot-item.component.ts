import {Component, Input, OnInit} from '@angular/core';
import {SurfSpot} from "../../model/SurfSpot";

@Component({
  selector: 'app-surfspot-item',
  templateUrl: './surfspot-item.component.html',
  styleUrls: ['./surfspot-item.component.css']
})
export class SurfspotItemComponent implements OnInit {

  @Input() surfspot: SurfSpot

  constructor() { }

  ngOnInit(): void {
  }

}
