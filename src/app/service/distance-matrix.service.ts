import {Injectable} from '@angular/core';
import {Surfspot} from "../model/Surfspot";
import {LatLng, LatLngLiteral} from "ngx-google-places-autocomplete/objects/latLng";

@Injectable({
  providedIn: 'root'
})
/**
 * A use case specific wrapper around googles distance matrix service.
 * @see https://developers.google.com/maps/documentation/javascript/distancematrix
 */
export class DistanceMatrixService {
  private service: google.maps.DistanceMatrixService

  constructor() {
    this.service = new google.maps.DistanceMatrixService()
  }

  public calculateDistanceFromOriginToSpots(origin: LatLngLiteral | LatLng, surfspots: Surfspot[]): Promise<Surfspot[]> {
    const chunkSize = 25;
    let chunkedServicePremises: Promise<Surfspot[]>[] = []
    for (let i = 0; i < surfspots.length; i += chunkSize) {
      const chunk = surfspots.slice(i, i + chunkSize);
      chunkedServicePremises.push(this._calculateDistanceFromOriginToSpots(origin, chunk))
    }
    return Promise.all(chunkedServicePremises).then(result => [].concat(...result));
  }

  private _calculateDistanceFromOriginToSpots(origin: LatLngLiteral | LatLng, surfspots: Surfspot[]) {
    let request = this._buildRequestForSurfspots(origin, surfspots)
    let promise = this.service.getDistanceMatrix(request)
    return promise.then(response =>
      response.rows[0].elements.map(
        (element, eIdx) => {
          surfspots[eIdx].distanceToCurrentLocation = element.distance.text;
          return surfspots[eIdx]
        }))
  }

  private _buildRequestForSurfspots(origin: LatLngLiteral | LatLng, surfspots: Surfspot[]): any {
    let request = {
      origins: [origin],
      destinations: new Array<LatLngLiteral | LatLng>(),
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    }
    surfspots.forEach((it, idx) => request.destinations[idx] = it.coords)
    return request
  }

}
