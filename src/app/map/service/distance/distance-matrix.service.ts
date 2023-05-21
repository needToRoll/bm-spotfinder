import {Injectable} from '@angular/core';
import {SurfSpot} from "../../../shared/model/SurfSpot";
import {GoogleCoordinates} from "../../../shared/model/Types";
import {concat, from, map, Observable, of, tap} from "rxjs";


@Injectable({
  providedIn: 'root'
})
/**
 * A use case specific wrapper around googles distance matrix service.
 * @see https://developers.google.com/maps/documentation/javascript/distancematrix
 */
export class DistanceMatrixService {
  private service: google.maps.DistanceMatrixService
  private readonly BM_SPOT_CACHE_DISTANCE = "bm-swd_"

  constructor() {
    this.service = new google.maps.DistanceMatrixService()
  }

  private spotDistance = (spot: SurfSpot) => spot.distanceToCurrentLocation?.value ?? Number.MAX_SAFE_INTEGER;
  private toLocalStorageKey = (coords: GoogleCoordinates) => this.BM_SPOT_CACHE_DISTANCE + coords.lng + ":" + coords.lat

  public getDisplayTitleIncludingDistance(spot: SurfSpot) {
    let result = spot.title;
    if (spot.distanceToCurrentLocation && spot.distanceToCurrentLocation.text) {
      result += " (" + spot.distanceToCurrentLocation.text + ")"
    }
    return result
  }

  /**
   * Enriches the passed surf spots with the distance to the origin.
   * The returned surfSpots are sorted in descending order by distance to the origin
   * @param origin
   * @param surfSpots
   */
  public calculateDistanceFromOriginToSpots(origin: GoogleCoordinates, surfSpots: SurfSpot[]): Observable<SurfSpot[]> {
    if (origin == null) {
      return of(surfSpots)
    }
    this._cleanCacheIfNeeded(origin)
    let cacheKey = this.toLocalStorageKey(origin)
    let spotsToCalculate = surfSpots
    let spotsFromCache: SurfSpot[] = []
    let cachedValues: SurfSpot[] = []
    if (localStorage.getItem(cacheKey) != null) {
      try {
        cachedValues = JSON.parse(localStorage.getItem(cacheKey))
        spotsFromCache = cachedValues.filter(value => surfSpots.map(s => s.placeId).includes(value.placeId))
        spotsToCalculate = surfSpots.filter(value => !cachedValues.map(s => s.placeId).includes(value.placeId))
      } catch (e) {
        localStorage.removeItem(cacheKey)
      }
    }
    return this._calculateDistanceFromOriginToSpots(origin, spotsToCalculate).pipe(
      map(spotsWithDistanceCalculatedByRemote => spotsWithDistanceCalculatedByRemote.concat(spotsFromCache)),
      map(allSpots => allSpots.sort((one, other) => this.spotDistance(one) - this.spotDistance(other))),
    ).pipe(
      tap(allSortedSpots => localStorage.setItem(cacheKey, this._buildJsonCacheString(allSortedSpots, cachedValues)))
    )
  }

  private _cleanCacheIfNeeded(...originsToReserve: GoogleCoordinates[]) {
    let maxNumberOfLocationToCache = 20
    let potentiallyObsoleteKeys: string[] = []
    let keysToPreserve = originsToReserve.map(value => this.toLocalStorageKey(value))
    for (let localStorageKey in localStorage) {
      if (localStorageKey.startsWith(this.BM_SPOT_CACHE_DISTANCE) && !keysToPreserve.includes(localStorageKey)) {
        potentiallyObsoleteKeys.push(localStorageKey)
      }
    }
    if(potentiallyObsoleteKeys.length != 0 && potentiallyObsoleteKeys.length > maxNumberOfLocationToCache - keysToPreserve.length) {
      potentiallyObsoleteKeys.forEach(key => localStorage.removeItem(key))
    }
  }

  private _buildJsonCacheString(newlyCalculatedSpots: SurfSpot[], previouslyCachedSpots: SurfSpot[]) {
    let spotsFromCacheThatAreUnchanged = previouslyCachedSpots.filter(value => !newlyCalculatedSpots.map(s => s.placeId).includes(value.placeId))
    let allSpotsToCache = spotsFromCacheThatAreUnchanged.concat(newlyCalculatedSpots)
    return JSON.stringify(allSpotsToCache)
  }

  private _calculateDistanceFromOriginToSpots(origin: GoogleCoordinates, surfSpots: SurfSpot[]): Observable<SurfSpot[]> {
    const chunkSize = 25;
    if (surfSpots.length == 0) {
      return of(surfSpots)
    }
    let chunkedServiceObservables: Observable<SurfSpot[]>[] = []
    for (let i = 0; i < surfSpots.length; i += chunkSize) {
      const chunk = surfSpots.slice(i, i + chunkSize);
      chunkedServiceObservables.push(from(this._calculateDistanceFromOriginToSpotsChunk(origin, chunk)));
    }
    return concat(...chunkedServiceObservables)
  }

  private async _calculateDistanceFromOriginToSpotsChunk(origin: GoogleCoordinates, surfSpots: SurfSpot[]) {
    let request = DistanceMatrixService._buildRequestForSurfSpots(origin, surfSpots)
    let response = await this.service.getDistanceMatrix(request)
    console.warn("Performed Request: " + JSON.stringify(request))
    console.warn("Received response: " + JSON.stringify(response))

    let enrichedSurfSpots = this._enrichSurfSpotsWithDistanceFromResponse(surfSpots, response);
    return enrichedSurfSpots
  }

  private _enrichSurfSpotsWithDistanceFromResponse(surfSpots: SurfSpot[], distanceResponse: google.maps.DistanceMatrixResponse) {
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
