import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SurfSpotService} from "../service/surf-spot.service";
import {Surfspot} from "../model/Surfspot";
import {GeolocationService} from "../service/geolocation.service";
import {GoogleMap, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit {

  public readonly DEFAULT_ZOOM = 13
  private accessAttemptCount = 0

  mapOptions: google.maps.MapOptions
  markerIcon: google.maps.Icon

  @ViewChild(GoogleMap) googleMapComponent: GoogleMap

  constructor(private httpClient: HttpClient, private surfspotService: SurfSpotService, private geolocationService: GeolocationService) {
    this.mapOptions = MapComponent.getMapOptions()
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

  trySetCenterMapComponent(location: GeolocationPosition) {
    let longLat: google.maps.LatLngLiteral = {lng: location.coords.longitude, lat: location.coords.latitude}
    this.getGoogleMapObject()?.setCenter(longLat)
      let locationMarker = new google.maps.Marker({
      position: longLat,
        map: this.getGoogleMapObject()!!,
        title: 'My location',
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: "#228848",
          fillOpacity: 0.8,
          strokeOpacity: 0,
        }
    });
    console.log("Center set")
  }

  onGeolocationFound(self: MapComponent, location: GeolocationPosition) {
    console.log("Location found")
    self.trySetCenterMapComponent(location)
  }

  getCenter(): google.maps.LatLng | google.maps.LatLngLiteral {

    if (this.mapOptions.center == null) {
      return {lng: 46.948367, lat: 7.456186}
    } else {
      return this.mapOptions.center
    }
  }

  getSurfSpotsToDisplay(): Surfspot[] {
    return this.surfspotService.getAllSurfspots()
  }


  private static getMapOptions(): google.maps.MapOptions {
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

  ngOnInit(): void {
    console.warn("Init called")
    console.warn("zoom is " + this.mapOptions.zoom)
  }
}
