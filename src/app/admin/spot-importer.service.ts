import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {SPOTS} from "../service/surfspot/static.surfspots";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SpotImporterService {

  constructor(private fireStore: AngularFirestore) {

  }

  public importSpotDataToFirestore() {
    SPOTS.forEach(spot => {
      let spotDocument = this.fireStore.collection(environment.spotCollectionName).doc(spot.placeId);
      return spotDocument.set(spot);
    })
  }
}
