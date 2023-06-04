import { HydroDataSource } from '../../../shared/model/HydroDataSource';
import { GenericFirebaseConverter } from '../util/generic-firebase.converter';

export class FirebaseHydroDataSourcesConverter extends GenericFirebaseConverter<HydroDataSource> {
  constructor() {
    super();
  }
}
