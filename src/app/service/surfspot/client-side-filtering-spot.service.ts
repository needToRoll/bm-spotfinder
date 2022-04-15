import {SurfSpotService} from "./surf-spot.service";
import {SpotFilter} from "../../model/SpotFilter";
import {map, Observable} from "rxjs";
import {SurfSpot} from "../../model/SurfSpot";

export abstract class ClientSideFilteringSpotService implements SurfSpotService {

  getSurfSpotsMatchingFilter(spotFilter: SpotFilter): Observable<SurfSpot[]> {
    let spots = this.getAllSurfSpots()
    return spots.pipe(
      map(allSpots =>
        allSpots.filter(it =>
          ClientSideFilteringSpotService._spotMatchesDifficultyFilter(it, spotFilter) &&
          ClientSideFilteringSpotService._spotMatchesRopeFilter(it, spotFilter)))
    )
  }

  protected static _spotMatchesRopeFilter(spot: SurfSpot, filter: SpotFilter): boolean {
    return filter.ropeLength == null || spot.bmSpotInfo.ropeLength.includes(filter.ropeLength)
  }

  protected static _spotMatchesDifficultyFilter(spot: SurfSpot, filter: SpotFilter): boolean {
    return filter.difficulty == null || spot.bmSpotInfo.difficulty <= filter.difficulty
  }

  abstract getAllSurfSpots(): Observable<SurfSpot[]>
}
