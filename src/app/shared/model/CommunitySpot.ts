import { LatLngLiteral } from 'ngx-google-places-autocomplete-esb/lib/objects/latLng';

export interface CommunitySpot {
  placeId: string;
  title: string;
  address1: string;
  address2: string;
  coords: LatLngLiteral;
  bmSpotInfo: BmCommunitySpotInfo;
}

export interface BmCommunitySpotInfo {
  difficulty: number;
  ropeLength: number[];
  additionalInfo: string[];
}
