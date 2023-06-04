import { SpotFilter } from '../../../shared/model/SpotFilter';
import { Observable } from 'rxjs';
import { SurfSpot } from '../../../shared/model/SurfSpot';

export interface SurfSpotService {
  getAllSurfSpots(): Observable<SurfSpot[]>;

  getSurfSpotsMatchingFilter(spotFilter: SpotFilter): Observable<SurfSpot[]>;
}
