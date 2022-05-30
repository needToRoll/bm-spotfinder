import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
import {GoogleMapsConfiguration} from "../config/GoogleMapsConfiguration";
import {WaterLevelMeasurement} from "../model/WaterLevelMeasurement";
import {HydroDataSource} from "../model/HydroDataSource";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public readonly DEFAULT_ZOOM = GoogleMapsConfiguration.DEFAULT_ZOOM
  private serviceSubscription: Subscription

  private accessAttemptCount = 0

  public spotsToMark: Subject<SurfSpot[]>
  public waterLevelValues: Subject<WaterLevelMeasurement[]>
  public hydroSources: Subject<HydroDataSource[]>
  public userSelectedLocation: Subject<LatLngLiteral>
  public selectedSurfspot: Subject<SurfSpot> = new Subject<SurfSpot>();

  mapOptions: google.maps.MapOptions
  userSelectedLocationMarkerIcon: GoogleMapsMarkerElement
  surfspotMarkerIcon: GoogleMapsMarkerElement


  @ViewChild("mapContainerRef") mapContainerElementRef: ElementRef
  @ViewChild("spotListRef") spotListContainer: ElementRef

  @ViewChild(GoogleMap) googleMapComponent: GoogleMap

  constructor(private httpClient: HttpClient,
              private surfspotService: FirebaseSurfSpotService,
              private deviceService: DeviceClassificationService,
              private geolocationService: GeolocationService,
              private distanceMatrixService: DistanceMatrixService,
              private _bottomSheet: MatBottomSheet) {
    this.mapOptions = GoogleMapsConfiguration.getMapOptions()
    this.surfspotMarkerIcon = GoogleMapsConfiguration.getSpotMarkerIcon()
    this.userSelectedLocationMarkerIcon = GoogleMapsConfiguration.getSelectedLocationMarkerIcon()
    this.userSelectedLocation = new BehaviorSubject(undefined);
    this.spotsToMark = new BehaviorSubject([]);
    this.serviceSubscription = this.surfspotService.getAllSurfSpots()
      .subscribe(value => this.spotsToMark.next(value))

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

  ngOnInit(): void {
    let readUserLocationRef = this.tryReadGeoLocation.bind(this)
    setTimeout(readUserLocationRef, 700);
  }

  //region event handlers

  onFilterValueChanged(spotFilter: SpotFilter): void {
    if (!this.serviceSubscription.closed) {
      this.serviceSubscription.unsubscribe()
    }
    this.serviceSubscription = this.surfspotService.getSurfSpotsMatchingFilter(spotFilter)
      .pipe(withLatestFrom(this.userSelectedLocation)).subscribe(([spots, coords]) => {
          console.warn("Filter matched: " + spots.length + " spots!")
          if (coords != undefined) {
            this.distanceMatrixService.calculateDistanceFromOriginToSpots(coords, spots).subscribe(swd => {
              this.spotsToMark.next(swd)
              this._tryUpdateMapBounds(coords, swd)
            })
          } else {
            this.spotsToMark.next(spots)
          }
        }
      )
  }

  onGeolocationFound(location: GeolocationPosition) {
    let coords: google.maps.LatLngLiteral = {lng: location.coords.longitude, lat: location.coords.latitude}
    this._handleLocationChange(coords)
  }

  onPlaceFound(placeSearchResult: PlaceSearchResult) {
    let pos = placeSearchResult.geometry.location
    let coords = {lat: pos.lat(), lng: pos.lng()}
    this._handleLocationChange(coords)
  }

  //endregion

  //region function used in html bindings
  getCenter(): GoogleCoordinates {
    if (this.mapOptions.center == null) {
      return GoogleMapsConfiguration.DEFAULT_MAP_CENTER
    } else {
      return this.mapOptions.center
    }
  }

  tryReadGeoLocation() {
    this.geolocationService.getUserLocation()
      .then((position) => this.onGeolocationFound(position))
      .catch(reason => "Failed to read geo location: " + reason)
  }

  handleMarkerClicked(spot: SurfSpot) {
    this.selectedSurfspot.next(spot)
    if (this._shouldUseBottomSheet()) {
      this._bottomSheet.open(MobileSpotInfoSheetComponent, {data: {spot: spot}})
    }
  }

  shouldUseBottomSheet() {
    return this._shouldUseBottomSheet.bind(this)
  }

  //endregion

  private _trySetCenterMapComponent(coords: LatLngLiteral) {
    this._getGoogleMapObject()?.setCenter(coords)
    console.log("Center set")
  }

  private _handleLocationChange(newLocationCoordinates: LatLngLiteral) {
    this.userSelectedLocation.next(newLocationCoordinates)
  }

  // @ts-ignore
  private _getGoogleMapObject(): google.maps.Map | undefined {
    this.accessAttemptCount += 1;
    if (this.googleMapComponent != null && this.googleMapComponent.googleMap) {
      this.accessAttemptCount = 0;
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
      this.googleMapComponent.fitBounds(bounds, 80)
    } else {
      this._trySetCenterMapComponent(origin)
    }
  }

  private _shouldUseBottomSheet(): boolean {
    let isListWrappedToNewRow = this.spotListContainer.nativeElement.offsetTop > this.mapContainerElementRef.nativeElement.offsetTop
    return this.deviceService.shouldBeThreadedAsTouchDevice() || isListWrappedToNewRow;
  }

}
