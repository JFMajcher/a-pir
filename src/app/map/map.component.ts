import { Component, Input, ViewChild, NgZone, OnInit, AfterContentInit, ContentChildren, Directive, EventEmitter, OnChanges, OnDestroy, Output, QueryList, SimpleChange, forwardRef} from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MarkerLabel, MouseEvent } from 'node_modules/map-types';
import { FitBoundsAccessor, FitBoundsDetails } from '@agm/core/services/fit-bounds';
import * as mapTypes from '@agm/core/services/google-maps-types';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import { AgmInfoWindow } from '@agm/core/directives/info-window';



declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  value: number;
  iconUrl1: string;
  iconUrl2: string;
  iconUrl3: string;
  iconUrl4: string;
  iconUrlx: string;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  marker?: Marker;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  geocoder: any;
  public location: Location = {
    lat: 52.202737,
    lng: 21.001095,
    marker: {
      lat: 52.202737,
      lng: 21.001095,
      value: 11,
      iconUrl1: "http://labs.google.com/ridefinder/images/mm_20_green.png ",
      iconUrl2: "http://labs.google.com/ridefinder/images/mm_20_yellow.png ",
      iconUrl3: "http://labs.google.com/ridefinder/images/mm_20_orange.png ",
      iconUrl4: "http://labs.google.com/ridefinder/images/mm_20_red.png ",
      iconUrlx: " "
    },
    zoom: 13
  };



  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }


  ngOnInit() {
    
  }
}
