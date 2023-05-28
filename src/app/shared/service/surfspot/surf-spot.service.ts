import { SpotFilter } from '../../model/SpotFilter';
import { Observable } from 'rxjs';
import { SurfSpot } from '../../model/SurfSpot';

export interface SurfSpotService {
  getAllSurfSpots(): Observable<SurfSpot[]>;

  getSurfSpotsMatchingFilter(spotFilter: SpotFilter): Observable<SurfSpot[]>;
}
