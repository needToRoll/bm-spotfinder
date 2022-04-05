import {Injectable} from '@angular/core';
import {Surfspot} from "../model/Surfspot";
import {SPOTS} from "./static.surfspots";
import {SpotFilter} from "../model/SpotFilter";

@Injectable({
  providedIn: 'root'
})
export class SurfSpotService {

  getAllSurfspots(): Surfspot[] {
    return SPOTS;
  }

  getSurfSpotsMatchingFilter(filter: SpotFilter): Surfspot[] {
    let spots = this.getAllSurfspots()
    return spots.filter(it =>
      SurfSpotService._spotMatchesDifficultyFilter(it, filter) &&
      SurfSpotService._spotMatchesRopeFilter(it, filter))
  }

  private static _spotMatchesRopeFilter(spot: Surfspot, filter: SpotFilter): boolean {
    return filter.ropeLength == null || spot.bmSpotInfo.ropeLength == filter.ropeLength
  }

  private static _spotMatchesDifficultyFilter(spot: Surfspot, filter: SpotFilter): boolean {
    return filter.difficulty == null || spot.bmSpotInfo.difficulty == filter.difficulty
  }

  constructor() {
  }
}
