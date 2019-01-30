import { Component, Input, ViewChild, NgZone, OnInit, AfterContentInit, ContentChildren, Directive, EventEmitter, OnChanges, OnDestroy, Output, QueryList, SimpleChange, forwardRef, Injectable } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
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
  iconUrl: string;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
}

const greenIcon: string = "http://labs.google.com/ridefinder/images/mm_20_green.png ";
const yellowIcon: string = "http://labs.google.com/ridefinder/images/mm_20_yellow.png ";
const orangeIcon: string = "http://labs.google.com/ridefinder/images/mm_20_orange.png ";
const redIcon: string = "http://labs.google.com/ridefinder/images/mm_20_red.png ";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  
  @ViewChild(AgmMap) map: AgmMap;

  geocoder: any;

  public mapStartup: Location = {
    lat: 52.202737,
    lng: 21.001095,
    zoom: 13
  }

  public locations: Marker[] = this.getLocations();
  
  constructor(public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private httpClient: HttpClient) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {
  }

  getLocations(): Marker[]{
    var url="http://localhost:8080/markers";
    var result: Marker[] = [];
    this.httpClient.get<Marker[]>(url).subscribe(data => {
      data.forEach(element => {
        element.iconUrl = this.resolveIconUrl(element.value);
        result.push(element)
      });
    })

    return result;
  }

  resolveIconUrl(value: number): string {
    if(value < 10) {
      return greenIcon;
    }
    else if(value >= 10 && value < 20) {
      return yellowIcon;
    }
    else if(value >= 20 && value < 30) {
      return orangeIcon;
    }
    else if(value >= 30) {
      return redIcon;
    }
  }
}
