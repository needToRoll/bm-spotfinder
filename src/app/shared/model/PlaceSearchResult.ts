export interface PlaceSearchResult {
  place_id: string
  geometry: PlaceGeometry
}

export interface PlaceGeometry {
  location: google.maps.LatLng
}
