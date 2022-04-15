import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {SurfSpot} from "../model/SurfSpot";

@Component({
  selector: 'app-surfspot-list',
  templateUrl: './surfspot-list.component.html',
  styleUrls: ['./surfspot-list.component.css']
})
export class SurfspotListComponent implements OnInit {

  @Input() surfspots: Observable<SurfSpot[]>

  constructor() { }

  ngOnInit(): void {
  }

}
