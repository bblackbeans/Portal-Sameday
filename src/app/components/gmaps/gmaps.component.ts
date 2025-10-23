import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GmapsLegs } from './gmaps.dto';

@Component({
  selector: 'app-gmaps',
  templateUrl: './gmaps.component.html',
  styleUrls: ['./gmaps.component.scss']
})
export class GmapsComponent implements OnInit {

  constructor() { }

  @Input() markerA: google.maps.LatLng;
  @Input() markerB: google.maps.LatLng;
  @Input() markerDraggable: boolean = true;

  @Output('legs') gmapLegs: EventEmitter<GmapsLegs> = new EventEmitter<GmapsLegs>();

  private directionsService = new google.maps.DirectionsService();
  private directionsRenderer = new google.maps.DirectionsRenderer();
  private map: google.maps.Map;

  private iconA: any = {
    url: "assets/img/map/mark-a.png", // url
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(20, 50) // anchor
  };

  private iconB: any = {
    url: "assets/img/map/mark-b.png", // url
    scaledSize: new google.maps.Size(50, 50), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(20, 50) // anchor
  };

  private gMarkerA: google.maps.Marker;
  private gMarkerB: google.maps.Marker;

  ngOnInit(): void {
    setTimeout(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: this.markerA,
        fullscreenControl: true,
        scrollwheel: true,
        zoom: 17,
      });

      // The marker, positioned 
      this.gMarkerA = new google.maps.Marker({
        position: this.markerA,
        icon: this.iconA,
        draggable: this.markerDraggable,
        map: this.map,
      });

      // The marker, positioned 
      this.gMarkerB = new google.maps.Marker({
        position: this.markerB,
        icon: this.iconB,
        draggable: this.markerDraggable,
        map: this.map,
      });

      const lineConfig: google.maps.PolylineOptions = { strokeColor: '#9c27b0', strokeWeight: 8 };
      this.directionsRenderer.setMap(this.map);
      this.directionsRenderer.setOptions({ suppressMarkers: true, polylineOptions: lineConfig });

      google.maps.event.addListener(this.gMarkerA, 'dragend', () => this.calculateRoute());

      google.maps.event.addListener(this.gMarkerB, 'dragend', () => this.calculateRoute());

      this.calculateRoute();
    }, 1000)
  }

  calculateRoute() {
    const travel: google.maps.DirectionsRequest = {
      origin: this.gMarkerA.getPosition(),
      destination: this.gMarkerB.getPosition(),
      travelMode: google.maps.TravelMode.DRIVING
    }

    this.directionsService.route(travel, (result, status) => {
      if (status == 'OK') {
        this.directionsRenderer.setDirections(result);

        const route = result.routes[0];
        const legs = new GmapsLegs();
        legs.duration = route.legs[0].duration.text;
        legs.distance = route.legs[0].distance.text;

        this.gmapLegs.emit(legs);
      }
    });
  }

}