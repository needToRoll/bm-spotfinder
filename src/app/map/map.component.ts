import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SurfSpot} from "../model/SurfSpot";
import {GeolocationService} from "../service/locator/geolocation.service";
import {GoogleMap} from "@angular/google-maps";
import {SpotFilter} from "../model/SpotFilter";
import {BehaviorSubject, Subject, Subscription, withLatestFrom} from "rxjs";
import {LatLngLiteral} from "ngx-google-places-autocomplete/objects/latLng";
import {PlaceSearchResult} from "../model/PlaceSearchResult";
import {GoogleCoordinates, GoogleMapsMarkerElement} from "../model/Types";
import {DistanceMatrixService} from "../service/distance/distance-matrix.service";
import {FirebaseSurfSpotService} from "../service/surfspot/firebase-surf-spot.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {DeviceClassificationService} from "../service/device-classification.service";
import {MobileSpotInfoSheetComponent} from "../mobile-spot-info-sheet/mobile-spot-info-sheet.component";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public readonly DEFAULT_ZOOM = 13
  private readonly DEFAULT_MAP_CENTER: LatLngLiteral = {lng: 46.948367, lat: 7.456186}
  private serviceSubscription: Subscription

  private accessAttemptCount = 0

  public spotsToMark: Subject<SurfSpot[]>
  public userSelectedLocation: Subject<LatLngLiteral>
  public selectedSurfspot: Subject<SurfSpot> = new Subject<SurfSpot>();

  mapOptions: google.maps.MapOptions
  userSelectedLocationMarkerIcon: GoogleMapsMarkerElement
  surfspotMarkerIcon: GoogleMapsMarkerElement

  @ViewChild(GoogleMap) googleMapComponent: GoogleMap

  constructor(private httpClient: HttpClient,
              private surfspotService: FirebaseSurfSpotService,
              private deviceService: DeviceClassificationService,
              private geolocationService: GeolocationService,
              private distanceMatrixService: DistanceMatrixService,
              private _bottomSheet: MatBottomSheet) {
    this.mapOptions = MapComponent._getMapOptions()
    this.surfspotMarkerIcon = MapComponent._getSpotMarkerIcon()
    this.userSelectedLocationMarkerIcon = MapComponent._getSelectedLocationMarkerIcon()
    this.userSelectedLocation = new Subject();
    this.spotsToMark = new BehaviorSubject([]);
    this.serviceSubscription = this.surfspotService.getAllSurfSpots()
      .subscribe(value => this.spotsToMark.next(value))

  }


  public isMobileCapable() {

  }

  ngOnInit(): void {
    this.tryReadGeoLocation()
    this.userSelectedLocation.pipe(
      withLatestFrom(this.spotsToMark)
    ).subscribe(([coords, spots]) => {
      this.distanceMatrixService.calculateDistanceFromOriginToSpots(coords, spots)
        .subscribe(enrichedSpots => {
            this.spotsToMark.next(enrichedSpots)
            this._tryUpdateMapBounds(coords, enrichedSpots)
          }
        )

    })
  }

  //region event handlers

  onFilterValueChanged(spotFilter: SpotFilter): void {
    if (!this.serviceSubscription.closed) {
      this.serviceSubscription.unsubscribe()
    }
    this.serviceSubscription = this.surfspotService.getSurfSpotsMatchingFilter(spotFilter)
      .subscribe(value => {
          this.spotsToMark.next(value)
          console.warn("Filter matched: " + value.length + " spots!")
        }
      )
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

  private _tryUpdateMapBounds(origin: LatLngLiteral, spots: SurfSpot[]) {
    let spotsWithDistance = spots.filter(spot => spot.distanceToCurrentLocation != undefined);
    if (spotsWithDistance.length > 0) {
      let bounds = new google.maps.LatLngBounds();
      bounds.extend(origin)
      let cutOfDistance = spotsWithDistance[0].distanceToCurrentLocation.value * 2;
      cutOfDistance = cutOfDistance < 50000 ? 50000 : cutOfDistance
      spotsWithDistance.filter(spot => spot.distanceToCurrentLocation.value < cutOfDistance).forEach(
        spot => bounds.extend(spot.coords)
      )
      this.googleMapComponent.center = origin
      this.googleMapComponent.fitBounds(bounds)
    } else {
      this._trySetCenterMapComponent(origin)
    }
  }

  private static _getMapOptions(): google.maps.MapOptions {
    return {
      center: {lat: 46.948367, lng: 7.456186},
      fullscreenControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      clickableIcons: false,
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

  doNothing() {
    return
  }

  tryReadGeoLocation() {
    this.geolocationService.getUserLocation()
      .then((position) => this.onGeolocationFound(position))
      .catch(reason => "Failed to read geo location: " + reason)
  }

  handleMarkerClicked(spot: SurfSpot) {
    this.selectedSurfspot.next(spot)
    if (this.deviceService.shouldUseBottomSheet()) {
      this._bottomSheet.open(MobileSpotInfoSheetComponent, { data: {spot: spot} })
    }
  }
}
