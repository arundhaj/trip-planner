import { Component, ViewChild, OnInit } from '@angular/core';

import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { TripService } from './trip.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'trip-planner';

  @ViewChild(MapInfoWindow, {static: false}) infoWindow: MapInfoWindow;

  center = { lat: 12.931832806450556, lng: 77.74196197781967 }; // {lat: 18.5204, lng: 73.8567};
  route = [{
    latlng: new google.maps.LatLng(12.931491571975917, 77.74234771728516),
    desc: 'Saroj Harmony'
  }, {
    latlng: new google.maps.LatLng(12.542749188721114, 78.35158211052249),
    desc: 'Bargur Home'
  }];

  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 10;
  display?: google.maps.LatLngLiteral;
  directionService = new google.maps.DirectionsService();

  selectedMarkerSpot: google.maps.LatLngLiteral;

  tripList: any;
  selectedTrip: any;

  spotList: any;
  selectedSpot: any = {};

  constructor(private tripService: TripService) {}

  ngOnInit() {
    // new google.maps.

    // this.route.forEach(location => {
    //   this.markerPositions.push(location.latlng.toJSON());
    // });

    // this.directionService.route({
    //   origin: this.route[0].latlng,
    //   destination: this.route[1].latlng,
    //   travelMode: google.maps.TravelMode.DRIVING
    // }, response => {
    //   console.log(response);
    // });
    this.loadTripList();
  }

  loadTripList() {
    this.selectedTrip = null;
    this.selectedMarkerSpot = null;
    this.markerPositions = [];
    this.tripService.getTripList().subscribe(trips => {
      this.tripList = trips;
    });
  }

  loadTrip(trip) {
    this.selectedTrip = trip;
    this.selectedMarkerSpot = null;
    this.tripService.getSpotList(trip.id).subscribe(spots => {
      this.spotList = spots;
      // this.markerPositions = [];
      this.spotList.forEach(spot => {
        // const spotLatLng = new google.maps.LatLng(spot.lat, spot.lng);
        spot.latlng = new google.maps.LatLng(spot.lat, spot.lng);
        // this.markerPositions.push(spotLatLng.toJSON());
      });
    });
  }

  addMarker(event: google.maps.MouseEvent) {
    this.display = event.latLng.toJSON();
    this.selectedMarkerSpot = event.latLng.toJSON();
  }

  move(event: google.maps.MouseEvent) {
    // this.display = event.latLng.toJSON();
  }

  openInfoWindow(marker: MapMarker, spot?: any) {
    this.selectedSpot = spot ? spot : {};
    this.infoWindow.open(marker);
  }

  removeLastMarker() {
    // this.markerPositions.pop();
  }
}
