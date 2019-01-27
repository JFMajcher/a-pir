import { Component, Input, ViewChild, NgZone, OnInit, AfterContentInit, ContentChildren, Directive, EventEmitter, OnChanges, OnDestroy, Output, QueryList, SimpleChange, forwardRef} from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MarkerLabel, MouseEvent } from 'C:/Users/Dream Machines/a-pir/node_modules/map-types';
import { FitBoundsAccessor, FitBoundsDetails } from '@agm/core/services/fit-bounds';
import * as mapTypes from '@agm/core/services/google-maps-types';
import { MarkerManager } from '@agm/core/services/managers/marker-manager';
import { InfoWindowManager } from '@agm/core/services/managers/info-window-manager';


declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  value: number;
  iconUrl: string;
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
    lat: 52.222549,
    lng: 21.004424,
    marker: {
      lat: 52.202737,
      lng: 21.001095,
      value: 11,
      iconUrl: "http://labs.google.com/ridefinder/images/mm_20_orange.png "
    },
    zoom: 13
  };
 
  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader,
    _infoWindowManager: InfoWindowManager,
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
