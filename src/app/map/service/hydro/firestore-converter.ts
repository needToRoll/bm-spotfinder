import {WaterLevelMeasurement} from "../../../shared/model/WaterLevelMeasurement";
import {QueryDocumentSnapshot, SnapshotOptions} from "@angular/fire/firestore";

export class FirestoreConverter {
  fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): WaterLevelMeasurement[] {
    return snapshot.data(options) as WaterLevelMeasurement[]
  }
}
