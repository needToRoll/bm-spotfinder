import {Injectable} from '@angular/core';
import {SurfSpot} from "../model/SurfSpot";
import {GoogleCoordinates} from "../model/Types";
import {concat, from, map, Observable} from "rxjs";

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
  private spotDistance = (spot: SurfSpot) => spot.distanceToCurrentLocation?.value ?? Number.MAX_SAFE_INTEGER;

  /**
   * Enriches the passed surf spots with the distance to the origin.
   * The returned surfspots are sorted in descending order by distance to the origin
   * @param origin
   * @param surfspots
   */
  public calculateDistanceFromOriginToSpots(origin: GoogleCoordinates, surfspots: SurfSpot[]): Observable<SurfSpot[]> {
    const chunkSize = 25;
    let chunkedServiceObservables: Observable<SurfSpot[]>[] = []
    for (let i = 0; i < surfspots.length; i += chunkSize) {
      const chunk = surfspots.slice(i, i + chunkSize);
      chunkedServiceObservables.push(from(this._calculateDistanceFromOriginToSpots(origin, chunk)));
    }
    return concat(...chunkedServiceObservables).pipe(
      map(listOfSpots => listOfSpots.sort((one, other) => this.spotDistance(one) - this.spotDistance(other)))
    )
  }

  private async _calculateDistanceFromOriginToSpots(origin: GoogleCoordinates, surfSpots: SurfSpot[]) {
    let request = DistanceMatrixService._buildRequestForSurfSpots(origin, surfSpots)
    let response = await this.service.getDistanceMatrix(request)
    console.warn("Performed Request: " + JSON.stringify(request))
    console.warn("Received response: " + JSON.stringify(response))

    return this._enrichSurfspotsWithDistanceFromResponse(surfSpots, response)
  }

  private _enrichSurfspotsWithDistanceFromResponse(surfSpots: SurfSpot[], distanceResponse: google.maps.DistanceMatrixResponse) {
    const distances = distanceResponse.rows[0].elements.map(element => element?.distance ?? undefined)
    return surfSpots.map((surfspot, id) => ({...surfspot, distanceToCurrentLocation: distances[id]}))
  }

  private static _buildRequestForSurfSpots(origin: GoogleCoordinates, surfSpots: SurfSpot[]): google.maps.DistanceMatrixRequest {
    return {
      origins: [origin],
      destinations: surfSpots.map(value => value.coords),
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    }
  }

}
