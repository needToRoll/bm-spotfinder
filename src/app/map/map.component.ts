import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SurfSpotService} from "../service/surf-spot.service";
import {Surfspot} from "../model/Surfspot";
import {GeolocationService} from "../service/geolocation.service";
import {GoogleMap} from "@angular/google-maps";
import {SpotFilter} from "../model/SpotFilter";
import {Observable, of} from "rxjs";
import {LatLngLiteral} from "ngx-google-places-autocomplete/objects/latLng";
import {PlaceSearchResult} from "../service/PlaceSearchResult";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  public readonly DEFAULT_ZOOM = 13
  private readonly DEFAULT_MAP_CENTER: LatLngLiteral = {lng: 46.948367, lat: 7.456186}

  private accessAttemptCount = 0
  public spotsToMark: Observable<Surfspot[]>
  public userSelectedLocation: Observable<LatLngLiteral>
  public selectedSurfSpot: Observable<Surfspot>
  public locationMarker?: google.maps.Marker;
  mapOptions: google.maps.MapOptions
  markerIcon: google.maps.Icon

  @ViewChild(GoogleMap) googleMapComponent: GoogleMap

  constructor(private httpClient: HttpClient, private surfspotService: SurfSpotService, private geolocationService: GeolocationService) {
    this.mapOptions = MapComponent._getMapOptions()
    this.markerIcon = {
      url: './assets/icons/pin-white.svg',
      anchor: new google.maps.Point(20, 60),
    }
    this.geolocationService.positionDetectedEmitter
      .subscribe((pos) => this.onGeolocationFound(this, pos))
  }

  ngAfterViewInit(): void {
    this.geolocationService.getUserLocation()
  }

  ngOnInit(): void {
    this.spotsToMark = of(this.surfspotService.getAllSurfspots())
  }

  onFilterValueChanged(spotFilter: SpotFilter): void {
    let filteredSpots = this.surfspotService.getSurfSpotsMatchingFilter(spotFilter)
    this.spotsToMark = of(filteredSpots)
    console.warn("Filter matched: " + filteredSpots.length + " spots!")
  }

  // @ts-ignore
  getGoogleMapObject(): google.maps.Map | undefined {
    this.accessAttemptCount += 1;
    if (this.googleMapComponent != null && this.googleMapComponent.googleMap) {
      return this.googleMapComponent.googleMap
    }
    if (this.accessAttemptCount > 10) {
      setTimeout(this.getGoogleMapObject, 500);
    } else {
      console.log("Timeout of 5 seconds reached")
      return undefined;
    }
  }

  trySetCenterMapComponent(coords: LatLngLiteral) {
    this.getGoogleMapObject()?.setCenter(coords)
    console.log("Center set")
  }

  onGeolocationFound(self: MapComponent, location: GeolocationPosition) {
    console.log("Location found")
    let coords: google.maps.LatLngLiteral = {lng: location.coords.longitude, lat: location.coords.latitude}
    self.trySetCenterMapComponent(coords)
    self.placeUserMarkerAtPosition(coords)
  }

  onPlaceFound(placeSearchResult: PlaceSearchResult){
    let pos = placeSearchResult.geometry.location
    let coords = {lat: pos.lat(), lng: pos.lng()}
    this.trySetCenterMapComponent(coords)
    this.placeUserMarkerAtPosition(coords)

  }

  getCenter(): google.maps.LatLng | google.maps.LatLngLiteral {

    if (this.mapOptions.center == null) {
      return this.DEFAULT_MAP_CENTER
    } else {
      return this.mapOptions.center
    }
  }

  private placeUserMarkerAtPosition(coords: LatLngLiteral) {
    this.locationMarker = new google.maps.Marker({
      position: coords,
      map: this.getGoogleMapObject()!!,
      title: 'Location',
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 12,
        fillColor: "#228848",
        fillOpacity: 0.8,
        strokeOpacity: 0,
      }
    });

  }

  getSurfSpotsToDisplay(): Surfspot[] {
    return this.surfspotService.getAllSurfspots()
  }


  private static _getMapOptions(): google.maps.MapOptions {
    return {
      center: {lat: 46.948367, lng: 7.456186},
      fullscreenControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      zoom: 13,
      zoomControl: true,
      maxZoom: 17,
      mapId: "ca16d2171c271f81"
    };
  }


}
