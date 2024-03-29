import { Injectable } from '@angular/core';
import { CommunitySpot } from '../../shared/model/CommunitySpot';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommunitySpotService {
  constructor(private firestore: Firestore) {}

  saveSpot(spot: CommunitySpot) {
    let persistRef = this._persistInFirestore.bind(this, spot);
    let errorRef = this._handlePlaceSearchFail.bind(this, spot);
    return this._determinePlaceId(spot).catch(errorRef).then(persistRef);
  }

  private _persistInFirestore(spot: CommunitySpot): Promise<void> {
    return new Promise((resolve, reject) => {
      let waterLevelsCollection = collection(
        this.firestore,
        environment.spotCollectionName
      );
      addDoc(waterLevelsCollection, Object.assign({}, spot)).then(
        () => resolve(),
        reject
      );
    });
  }

  private _determinePlaceId(spot: CommunitySpot): Promise<CommunitySpot> {
    let queryText = spot.address1 + ', ' + spot.address2;
    let request: google.maps.places.FindPlaceFromQueryRequest = {
      query: queryText,
      fields: ['place_id', 'geometry.location'],
    };

    // @ts-ignore
    let placesService = new google.maps.places.PlacesService(
      new google.maps.Map(document.createElement('div'))
    );
    return new Promise((resolve, reject) => {
      placesService.findPlaceFromQuery(request, (results, status) => {
        try {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            spot.placeId = results[0].place_id;
            spot.coords = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            resolve(spot);
          } else {
            console.warn(
              'Status of place search is: ' + JSON.stringify(status)
            );
            reject(status);
          }
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  private _handlePlaceSearchFail(spot: CommunitySpot) {
    spot.placeId = 'UNKNOWN';
  }
}
