import {
  DocumentData,
  FirestoreDataConverter,
  PartialWithFieldValue,
  QueryDocumentSnapshot,
  SetOptions,
  SnapshotOptions,
  WithFieldValue,
} from '@angular/fire/firestore';

export class GenericFirebaseConverter<T> implements FirestoreDataConverter<T> {
  private _idFieldName?: string;

  constructor(idFieldName?: string) {
    this._idFieldName = idFieldName;
  }

  fromFirestore(snapshot: QueryDocumentSnapshot, options?: SnapshotOptions): T {
    let targetObject = {};
    if (this._idFieldName) {
      targetObject = { [this._idFieldName]: snapshot.id };
    }
    return Object.assign(targetObject, snapshot.data(options)) as T;
  }

  toFirestore(modelObject: WithFieldValue<T>): DocumentData;
  toFirestore(
    modelObject: PartialWithFieldValue<T>,
    options: SetOptions
  ): DocumentData;
  toFirestore(
    modelObject: WithFieldValue<T> | PartialWithFieldValue<T>,
    options?: SetOptions
  ): DocumentData {
    return Object.assign({}, modelObject);
  }
}
