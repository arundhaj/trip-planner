import { Component, ViewChild, OnInit } from '@angular/core';

import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
// import { fromLonLat } from 'ol/proj';
import * as olProj from 'ol/proj';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'trip-planner';

  latitude = 18.5204;
  longitude = 73.8567;

  map: any;

  ngOnInit() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: olProj.fromLonLat([77.580643, 12.972442]), // ol.proj.fromLonLat([73.8567, 18.5204]),
        zoom: 8
      })
    });
  }
}
