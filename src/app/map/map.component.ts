import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SurfSpotService} from "../service/surf-spot.service";
import {Surfspot} from "../model/Surfspot";
import {GeolocationService} from "../service/geolocation.service";
import {GoogleMap} from "@angular/google-maps";
import {SpotFilter} from "../model/SpotFilter";
import {BehaviorSubject, Subject, withLatestFrom} from "rxjs";
import {LatLngLiteral} from "ngx-google-places-autocomplete/objects/latLng";
import {PlaceSearchResult} from "../service/PlaceSearchResult";
import {GoogleCoordinates, GoogleMapsMarkerElement} from "../model/Types";
import {DistanceMatrixService} from "../service/distance-matrix.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public readonly DEFAULT_ZOOM = 13
  private readonly DEFAULT_MAP_CENTER: LatLngLiteral = {lng: 46.948367, lat: 7.456186}

  private accessAttemptCount = 0

  public spotsToMark: Subject<Surfspot[]>
  public userSelectedLocation: Subject<LatLngLiteral>

  mapOptions: google.maps.MapOptions
  userSelectedLocationMarkerIcon: GoogleMapsMarkerElement
  surfspotMarkerIcon: GoogleMapsMarkerElement

  @ViewChild(GoogleMap) googleMapComponent: GoogleMap

  constructor(private httpClient: HttpClient,
              private surfspotService: SurfSpotService,
              private geolocationService: GeolocationService,
              private distanceMatrixService: DistanceMatrixService) {
    this.mapOptions = MapComponent._getMapOptions()
    this.surfspotMarkerIcon = MapComponent._getSpotMarkerIcon()
    this.userSelectedLocationMarkerIcon = MapComponent._getSelectedLocationMarkerIcon()
    this.userSelectedLocation = new Subject();
    this.spotsToMark = new BehaviorSubject(this.surfspotService.getAllSurfspots());
    this.userSelectedLocation.subscribe(it => {
        this._trySetCenterMapComponent(it)
      }
    )
  }


  ngOnInit(): void {
    this.geolocationService.getUserLocation().then((position) => this.onGeolocationFound(position))
    this.userSelectedLocation.pipe(
      withLatestFrom(this.spotsToMark)
    ).subscribe(([coords, spots]) => {
      this.distanceMatrixService.calculateDistanceFromOriginToSpots(coords, spots)
        .subscribe(enrichedSpots =>
          this.spotsToMark.next(enrichedSpots)
        )

    })
  }

  //region event handlers

  onFilterValueChanged(spotFilter: SpotFilter): void {
    let filteredSpots = this.surfspotService.getSurfSpotsMatchingFilter(spotFilter)
    this.spotsToMark.next(filteredSpots)
    console.warn("Filter matched: " + filteredSpots.length + " spots!")
  }

  onGeolocationFound(location: GeolocationPosition) {
    console.log("Location found")
    let coords: google.maps.LatLngLiteral = {lng: location.coords.longitude, lat: location.coords.latitude}
    this._handleLocationChange(coords)
  }

  onPlaceFound(placeSearchResult: PlaceSearchResult) {
    let pos = placeSearchResult.geometry.location
    let coords = {lat: pos.lat(), lng: pos.lng()}
    this._handleLocationChange(coords)
  }

  private _handleLocationChange(newLocationCoordinates: LatLngLiteral) {
    this.userSelectedLocation.next(newLocationCoordinates)
  }

  //endregion

  //region function used in html bindings
  getCenter(): GoogleCoordinates {
    if (this.mapOptions.center == null) {
      return this.DEFAULT_MAP_CENTER
    } else {
      return this.mapOptions.center
    }
  }

  getSurfSpotsToDisplay(): Surfspot[] {
    return this.surfspotService.getAllSurfspots()
  }

  //endregion

  private _trySetCenterMapComponent(coords: LatLngLiteral) {
    this._getGoogleMapObject()?.setCenter(coords)
    console.log("Center set")
  }


  // @ts-ignore
  private _getGoogleMapObject(): google.maps.Map | undefined {
    this.accessAttemptCount += 1;
    if (this.googleMapComponent != null && this.googleMapComponent.googleMap) {
      return this.googleMapComponent.googleMap
    }
    if (this.accessAttemptCount < 10) {
      setTimeout(this._getGoogleMapObject, 500);
    } else {
      console.log("Timeout of 5 seconds reached")
      return undefined;
    }
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

  private static _getSpotMarkerIcon(): google.maps.Icon {
    return {
      url: './assets/icons/pin-white.svg',
      anchor: new google.maps.Point(20, 60),
    }
  }


  private static _getSelectedLocationMarkerIcon(): GoogleMapsMarkerElement {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 12,
      fillColor: "#228848",
      fillOpacity: 0.8,
      strokeOpacity: 0,
    }
  }

  clicked() {
    this.geolocationService.getUserLocation().then((position) => this.onGeolocationFound(position))

  }
}
