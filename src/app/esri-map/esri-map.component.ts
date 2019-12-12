import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import Map from "arcgis-js-api/Map";
import MapView from "arcgis-js-api/views/MapView";
import FeatureLayer from "arcgis-js-api/layers/FeatureLayer";
import esriConfig from "arcgis-js-api/config";

@Component({
  selector: "app-esri-map",
  templateUrl: "./esri-map.component.html",
  styleUrls: ["./esri-map.component.css"]
})
export class EsriMapComponent implements OnInit, OnDestroy, AfterViewInit {
  ngAfterViewInit(): void {
    this.initializeMap();
  }
  view: any;

  constructor() {
    const DEFAULT_WORKER_URL = "https://js.arcgis.com/4.13/";
const DEFAULT_LOADER_URL = `${DEFAULT_WORKER_URL}dojo/dojo-lite.js`;

(esriConfig.workers as any).loaderUrl = DEFAULT_LOADER_URL;
esriConfig.workers.loaderConfig = {
  baseUrl: `${DEFAULT_WORKER_URL}`,
  packages: [
    { name: "arcgis-js-api", location: DEFAULT_WORKER_URL + "esri" },
    { name: "dojo", location: DEFAULT_WORKER_URL + "dojo" },
    { name: "dojox", location: DEFAULT_WORKER_URL + "dojox" },
    { name: "dijit", location: DEFAULT_WORKER_URL + "dijit" },
    { name: "dstore", location: DEFAULT_WORKER_URL + "dstore" },
    { name: "moment", location: DEFAULT_WORKER_URL + "moment" },
    { name: "@dojo", location: DEFAULT_WORKER_URL + "@dojo" },
    {
      name: "cldrjs",
      location: DEFAULT_WORKER_URL + "cldrjs",
      main: "dist/cldr"
    },
    {
      name: "globalize",
      location: DEFAULT_WORKER_URL + "globalize",
      main: "dist/globalize"
    },
    {
      name: "maquette",
      location: DEFAULT_WORKER_URL + "maquette",
      main: "dist/maquette.umd"
    },
    {
      name: "maquette-css-transitions",
      location: DEFAULT_WORKER_URL + "maquette-css-transitions",
      main: "dist/maquette-css-transitions.umd"
    },
    {
      name: "maquette-jsx",
      location: DEFAULT_WORKER_URL + "maquette-jsx",
      main: "dist/maquette-jsx.umd"
    },
    { name: "tslib", location: DEFAULT_WORKER_URL + "tslib", main: "tslib" }
  ]
} as any;
  }

  async initializeMap() {
    try {
      // Configure the Map
      const mapProperties = {
        basemap: "hybrid"
      };

      const map = new Map(mapProperties);

      // Initialize the MapView
      const mapViewProperties = {
        container: document.getElementById('mapViewNode'),
        extent: {
          // autocasts as new Extent()
          xmin: -9177811,
          ymin: 4247000,
          xmax: -9176791,
          ymax: 4247784,
          spatialReference: 102100
        },
        map: map
      };

      this.view = new MapView(mapViewProperties);
      await this.view.when();
      var featureLayer = new FeatureLayer({
        url:
          "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0"
      });
      map.add(featureLayer);
      return this.view;
    } catch (error) {
      console.log("Esri: ", error);
    }
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.view) {
      // destroy the map view
      this.view.container = null;
    }
  }
}