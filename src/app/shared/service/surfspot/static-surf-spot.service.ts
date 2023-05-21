import {Injectable} from '@angular/core';
import {SurfSpot} from "../../model/SurfSpot";
import {SPOTS} from "./static.surfspots";
import {Observable, of} from "rxjs";
import {ClientSideFilteringSpotService} from "./client-side-filtering-spot.service";

@Injectable({
  providedIn: 'root'
})
export class StaticSurfSpotService extends ClientSideFilteringSpotService {

  constructor() {
    super();
  }

  getAllSurfSpots(): Observable<SurfSpot[]> {
    return of(SPOTS);
  }


}
