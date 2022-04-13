import {Injectable} from '@angular/core';
import {Surfspot} from "../model/Surfspot";
import {GoogleCoordinates} from "../model/Types";
import {concat, from, Observable} from "rxjs";

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

  public calculateDistanceFromOriginToSpots(origin: GoogleCoordinates, surfspots: Surfspot[]): Observable<Surfspot[]>{
    const chunkSize = 25;
    let chunkedServiceObservables: Observable<Surfspot[]>[] = []
    for (let i = 0; i < surfspots.length; i += chunkSize) {
      const chunk = surfspots.slice(i, i + chunkSize);
      chunkedServiceObservables.push(from(this._calculateDistanceFromOriginToSpots(origin, chunk)));
    }
    return concat(...chunkedServiceObservables)
  }

  private async _calculateDistanceFromOriginToSpots(origin: GoogleCoordinates, surfspots: Surfspot[]) {
    let request = DistanceMatrixService._buildRequestForSurfspots(origin, surfspots)
    let response = await this.service.getDistanceMatrix(request)
    console.warn("Performed Request: "+ JSON.stringify(request))
    console.warn("Received response: "+ JSON.stringify(response))

    return this._enrichSurfspotsWithDistanceFromResponse(surfspots, response)
  }

  private _enrichSurfspotsWithDistanceFromResponse(surfspots: Surfspot[], distanceResponse: google.maps.DistanceMatrixResponse){
    const distances = distanceResponse.rows[0].elements.map(element => element?.distance?.text ?? "")
    return surfspots.map((surfspot, id) => ({...surfspot, distanceToCurrentLocation: distances[id]}))
  }

  private static _buildRequestForSurfspots(origin: GoogleCoordinates, surfspots: Surfspot[]): google.maps.DistanceMatrixRequest {
    return {
      origins: [origin],
      destinations: surfspots.map(value => value.coords),
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    }
  }

}
