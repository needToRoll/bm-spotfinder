import {GoogleMapsMarkerElement} from "../model/Types";
import {LatLngLiteral} from "ngx-google-places-autocomplete/objects/latLng";

export class GoogleMapsConfiguration {


  public static readonly DEFAULT_ZOOM = 13
  public static readonly DEFAULT_MAP_CENTER: LatLngLiteral = {lng: 46.948367, lat: 7.456186}

  public static getMapOptions(): google.maps.MapOptions {
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

  public static getSpotMarkerIcon(): google.maps.Icon {
    return {
      url: './assets/icons/pin-white.svg',
      anchor: new google.maps.Point(20, 55),
      size: new google.maps.Size(40,55,"px", "px")
    }
  }

  public static getSelectedLocationMarkerIcon(): GoogleMapsMarkerElement {
    return {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 12,
      fillColor: "#228848",
      fillOpacity: 0.8,
      strokeOpacity: 0,
    }
  }

}
