import {Injectable} from '@angular/core';
import {WaterLevelService} from "./water-level-service";
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {WaterLevelMeasurement} from "../../../shared/model/WaterLevelMeasurement";
import {Observable} from "rxjs";
import {HydroDataSource} from "../../../shared/model/HydroDataSource";

@Injectable({
  providedIn: 'root'
})
export class FirebaseWaterLevelService implements WaterLevelService {

  constructor(private fireStore: Firestore) {
  }

  getAllCurrentWaterLevels(): Observable<WaterLevelMeasurement[]> {
    let waterLevelsCollection = collection(this.fireStore, "bm-water-levels")
    return collectionData(waterLevelsCollection, {idField: 'id'}) as Observable<WaterLevelMeasurement[]>
  }

  getAllHydroDataSources(): Observable<HydroDataSource[]> {
    let waterLevelsCollection = collection(this.fireStore, "bm-hydro-data-sources")
    return collectionData(waterLevelsCollection) as Observable<HydroDataSource[]>
  }

}

