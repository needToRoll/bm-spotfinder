import { Injectable } from '@angular/core';
import { FirebaseWaterLevelService } from './firebase-water-level.service';
import {
  BehaviorSubject,
  map,
  Observable,
  Subject,
  withLatestFrom,
} from 'rxjs';
import { WaterLevelMeasurement } from '../../../shared/model/WaterLevelMeasurement';
import { HydroDataSource } from '../../../shared/model/HydroDataSource';
import { SurfSpot } from '../../../shared/model/SurfSpot';
import { HydroDetails } from '../../../shared/model/HydroDetails';

@Injectable({
  providedIn: 'root',
})
export class HydroDataProviderService {
  private walterLevels: Subject<WaterLevelMeasurement[]>;
  private hydroSources: Subject<HydroDataSource[]>;

  constructor(private _wls: FirebaseWaterLevelService) {
    this.walterLevels = new BehaviorSubject([]);
    this.hydroSources = new BehaviorSubject([]);
    this._wls
      .getAllCurrentWaterLevels()
      .subscribe((wls) => this.walterLevels.next(wls));
    this._wls
      .getAllHydroDataSources()
      .subscribe((hds) => this.hydroSources.next(hds));
  }

  public readHydroDataForSpot(spot: SurfSpot): Observable<HydroDetails> {
    let result: HydroDetails = {
      value: -1,
      measuredAt: '',
      sourceLink: '',
      sourceName: '',
    };
    return this.walterLevels.pipe(withLatestFrom(this.hydroSources)).pipe(
      map(([currentWaterLevels, currentSources]) => {
        if (
          spot.bmSpotInfo.waterLevelSource &&
          spot.bmSpotInfo.waterLevelSource.length != 0
        ) {
          let cwl = currentWaterLevels.find(
            (wl) => wl.id == spot.bmSpotInfo.waterLevelSource
          );
          if (cwl) {
            result.value = cwl.value;
            result.measuredAt = cwl.measuredAt;
            let sourceKey = cwl.id.split('_')[0];
            let csd = currentSources.find((s) => s.name == sourceKey);
            if (csd) {
              result.sourceName = csd.name;
              result.sourceLink = csd.webLink;
            }
          }
        }
        return result;
      })
    );
  }
}
