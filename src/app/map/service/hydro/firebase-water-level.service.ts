import { Injectable } from '@angular/core';
import { WaterLevelService } from './water-level-service';
import { FirebaseWaterLevelMeasurementConverter } from './firebase-water-level-measurement.converter';
import { WaterLevelMeasurement } from '../../../shared/model/WaterLevelMeasurement';
import { BehaviorSubject, Observable } from 'rxjs';
import { HydroDataSource } from '../../../shared/model/HydroDataSource';
import { collection, Firestore, onSnapshot } from '@angular/fire/firestore/';
import { FirebaseHydroDataSourcesConverter } from './firebase-hydro-data-sources.converter';
import { extractDataFromSnapshot } from '../util/firebase.util';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FirebaseWaterLevelService implements WaterLevelService {
  private _waterLevels: BehaviorSubject<WaterLevelMeasurement[]> =
    new BehaviorSubject([]);
  private _hydroSources: BehaviorSubject<HydroDataSource[]> =
    new BehaviorSubject<HydroDataSource[]>([]);

  private _waterLevelConverter = new FirebaseWaterLevelMeasurementConverter();
  private _hydroSourceDataConverter = new FirebaseHydroDataSourcesConverter();

  constructor(private fireStore: Firestore) {
    onSnapshot(
      collection(fireStore, environment.waterLevelConnectionName).withConverter(
        this._waterLevelConverter
      ),
      (collectionSnapshot) => {
        var value = extractDataFromSnapshot(collectionSnapshot);
        console.debug(value);
        this._waterLevels.next(value);
      }
    );

    onSnapshot(
      collection(
        fireStore,
        environment.hydroDataSourceCollectionName
      ).withConverter(this._hydroSourceDataConverter),
      (collectionSnapshot) => {
        this._hydroSources.next(extractDataFromSnapshot(collectionSnapshot));
      }
    );
  }

  getAllCurrentWaterLevels(): BehaviorSubject<WaterLevelMeasurement[]> {
    return this._waterLevels;
  }

  getAllHydroDataSources(): Observable<HydroDataSource[]> {
    return this._hydroSources;
  }
}
