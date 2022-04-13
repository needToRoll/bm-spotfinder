import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SurfSpotService} from "../service/surf-spot.service";
import {Surfspot} from "../model/Surfspot";
import {GeolocationService} from "../service/geolocation.service";
import {GoogleMap} from "@angular/google-maps";
import {SpotFilter} from "../model/SpotFilter";
import {Observable, of, Subject} from "rxjs";
import {LatLngLiteral} from "ngx-google-places-autocomplete/objects/latLng";
import {PlaceSearchResult} from "../service/PlaceSearchResult";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public readonly DEFAULT_ZOOM = 13
  private readonly DEFAULT_MAP_CENTER: LatLngLiteral = {lng: 46.948367, lat: 7.456186}

  private accessAttemptCount = 0

  public spotsToMark: Observable<Surfspot[]>
  public userSelectedLocation: Subject<LatLngLiteral>
  // public selectedSurfSpot: Observable<Surfspot>

  mapOptions: google.maps.MapOptions
  userSelectedLocationMarkerIcon: (google.maps.Icon | google.maps.Symbol)
  surfspotMarkerIcon: google.maps.Icon

  @ViewChild(GoogleMap) googleMapComponent: GoogleMap

  constructor(private httpClient: HttpClient, private surfspotService: SurfSpotService, private geolocationService: GeolocationService) {
    this.mapOptions = MapComponent._getMapOptions()
    this.surfspotMarkerIcon = MapComponent._getSpotMarkerIcon()
    this.userSelectedLocationMarkerIcon = MapComponent._getSelectedLocationMarkerIcon()
    this.userSelectedLocation = new Subject();
    this.userSelectedLocation.subscribe(it => {
        this._trySetCenterMapComponent(it)
      }
    )
  }


  ngOnInit(): void {
    this.spotsToMark = of(this.surfspotService.getAllSurfspots())
    this.geolocationService.getUserLocation().then((position) => this.onGeolocationFound(position))
  }

  //region event handlers

  onFilterValueChanged(spotFilter: SpotFilter): void {
    let filteredSpots = this.surfspotService.getSurfSpotsMatchingFilter(spotFilter)
    this.spotsToMark = of(filteredSpots)
    console.warn("Filter matched: " + filteredSpots.length + " spots!")
  }

  onGeolocationFound(location: GeolocationPosition) {
    console.log("Location found")
    let coords: google.maps.LatLngLiteral = {lng: location.coords.longitude, lat: location.coords.latitude}
   this.userSelectedLocation.next(coords)

  }

  onPlaceFound(placeSearchResult: PlaceSearchResult) {
    let pos = placeSearchResult.geometry.location
    let coords = {lat: pos.lat(), lng: pos.lng()}
    this.userSelectedLocation.next(coords)
  }

  //endregion

  //region function used in html bindings
  getCenter(): google.maps.LatLng | google.maps.LatLngLiteral {
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


  private static _getSelectedLocationMarkerIcon(): (google.maps.Symbol | google.maps.Icon) {
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
