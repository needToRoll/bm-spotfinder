import {Observable} from "rxjs";
import {WaterLevelMeasurement} from "../../../model/WaterLevelMeasurement";
import {HydroDataSource} from "../../../model/HydroDataSource";

export interface WaterLevelService {
  getAllCurrentWaterLevels(): Observable<WaterLevelMeasurement[]>
  getAllHydroDataSources(): Observable<HydroDataSource[]>
}
