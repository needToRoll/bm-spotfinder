import { Injectable } from '@angular/core';
import { SurfSpot } from '../../../shared/model/SurfSpot';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { ClientSideFilteringSpotService } from './client-side-filtering-spot.service';
import { FirebaseSurfSpotConverter } from './firebase-surf-spot.converter';
import { extractDataFromSnapshot } from '../util/firebase.util';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseSurfSpotService extends ClientSideFilteringSpotService {
  private _converter = new FirebaseSurfSpotConverter();
  private _surfSpots: BehaviorSubject<SurfSpot[]> = new BehaviorSubject<
    SurfSpot[]
  >([]);

  constructor(private fireStore: Firestore) {
    super();
    onSnapshot(
      collection(fireStore, environment.spotCollectionName).withConverter(
        this._converter
      ),
      (collectionSnapshot) => {
        this._surfSpots.next(extractDataFromSnapshot(collectionSnapshot));
      }
    );
  }

  getAllSurfSpots(): Observable<SurfSpot[]> {
    return this._surfSpots;
  }
}
