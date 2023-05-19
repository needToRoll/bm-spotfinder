import {Injectable} from '@angular/core';
import {SurfSpot} from "../../../model/SurfSpot";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {ClientSideFilteringSpotService} from "./client-side-filtering-spot.service";

@Injectable({
  providedIn: 'root'
})
export class FirebaseSurfSpotService extends ClientSideFilteringSpotService {

  constructor(private fireStore: AngularFirestore) {
    super();
  }

  getAllSurfSpots(): Observable<SurfSpot[]> {
    return this.fireStore.collection<SurfSpot>("bm-surfspots").valueChanges()
  }

}
