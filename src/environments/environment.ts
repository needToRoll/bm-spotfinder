// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'lithe-bazaar-341817',
    appId: '1:555596215902:web:70bf1fe1180e2080be26cf',
    storageBucket: 'lithe-bazaar-341817.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyChSW7nYgB_AWH4iIcS15cbJ0N4EEe42UE',
    authDomain: 'lithe-bazaar-341817.firebaseapp.com',
    messagingSenderId: '555596215902',
    measurementId: 'G-0NDJP13RYL',
  },
  recaptchaSiteKey: '6Lca-0smAAAAAKKBUoFxK3jTXZ4W8Po_h56opjyD',
  spotCollectionName: 'bm-surfspots-dev',
  ropeLengthUnit: 'm',
  waterLevelUnit: 'm^3',
  waterLevelConnectionName: 'bm-water-levels',
  hydroDataSourceCollectionName: 'bm-hydro-data-sources',
  communitySpotCollectionName: 'user-proposed-surfspots',
  appCheckDebugToken: false,
  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
