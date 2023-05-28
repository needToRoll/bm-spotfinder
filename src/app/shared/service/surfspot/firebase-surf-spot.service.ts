import { Injectable } from '@angular/core';
import { SurfSpot } from '../../model/SurfSpot';
import {
  collection,
  collectionData,
  Firestore,
} from '@angular/fire/firestore/lite';
import { Observable } from 'rxjs';
import { ClientSideFilteringSpotService } from './client-side-filtering-spot.service';

@Injectable({
  providedIn: 'root',
})
export class FirebaseSurfSpotService extends ClientSideFilteringSpotService {
  constructor(private fireStore: Firestore) {
    super();
  }

  getAllSurfSpots(): Observable<SurfSpot[]> {
    let surfSpotCollectionRef = collection(this.fireStore, 'bm-surfspots');
    return collectionData(surfSpotCollectionRef) as Observable<SurfSpot[]>;
  }
}
