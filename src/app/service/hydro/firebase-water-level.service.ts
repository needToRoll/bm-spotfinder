import { Injectable } from '@angular/core';
import {WaterLevelService} from "./water-level-service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {WaterLevelMeasurement} from "../../model/WaterLevelMeasurement";
import {Observable} from "rxjs";
import {HydroDataSource} from "../../model/HydroDataSource";

@Injectable({
  providedIn: 'root'
})
export class FirebaseWaterLevelService implements WaterLevelService{

  constructor(private fireStore: AngularFirestore) { }

  getAllCurrentWaterLevels(): Observable<WaterLevelMeasurement[]> {
    return this.fireStore.collection<WaterLevelMeasurement>("bm-water-levels").valueChanges({idField: 'id'})
  }

  getAllHydroDataSources(): Observable<HydroDataSource[]> {
    return this.fireStore.collection<HydroDataSource>("bm-hydro-data-sources").valueChanges()
  }
}
