import {Observable} from "rxjs";
import {WaterLevelMeasurement} from "../../../shared/model/WaterLevelMeasurement";
import {HydroDataSource} from "../../../shared/model/HydroDataSource";

export interface WaterLevelService {
  getAllCurrentWaterLevels(): Observable<WaterLevelMeasurement[]>
  getAllHydroDataSources(): Observable<HydroDataSource[]>
}
