import { WaterLevelMeasurement } from '../../../shared/model/WaterLevelMeasurement';
import { GenericFirebaseConverter } from '../util/generic-firebase.converter';

export class FirebaseWaterLevelMeasurementConverter extends GenericFirebaseConverter<WaterLevelMeasurement> {
  constructor() {
    super('id');
  }
}
