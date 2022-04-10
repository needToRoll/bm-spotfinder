export interface Surfspot {
  placeId: string;
  title: string;
  address1: string;
  address2: string;
  coords: google.maps.LatLng|google.maps.LatLngLiteral;
  bmSpotInfo: BmSpotInfo;
}

export interface BmSpotInfo {
  webLink: string;
  difficulty: number;
  ropeLength: number;
  minimalWaterLevel: number;
  waterLevelSource: string;
  dangers: string[];
  entries: string[];
  exits: string[];
  additionalInfo: string[];
}
