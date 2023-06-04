import { GenericFirebaseConverter } from '../util/generic-firebase.converter';
import { SurfSpot } from '../../../shared/model/SurfSpot';

export class FirebaseSurfSpotConverter extends GenericFirebaseConverter<SurfSpot> {
  constructor() {
    super('placeId');
  }
}
