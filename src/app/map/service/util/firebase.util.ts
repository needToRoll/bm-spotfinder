import { QuerySnapshot } from '@angular/fire/firestore';

export function extractDataFromSnapshot<T>(
  collectionSnapshot: QuerySnapshot<T>
): T[] {
  return collectionSnapshot.docs.map((documentSnapshot) =>
    documentSnapshot.data()
  );
}
