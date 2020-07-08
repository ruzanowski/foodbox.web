import {AfterViewInit, Component, OnInit} from '@angular/core';
declare var ol: any;
@Component({
    selector: 'food-map-core',
    templateUrl: './food-map-core.component.html',
    styleUrls: ['./food-map-core.component.scss']
})
export class FoodMapCoreComponent implements OnInit, AfterViewInit {
    map: any;

    ngOnInit() {
        this.map = new ol.Map({
            target: 'map',
            layers: [
                new ol.layer.Tile({
                    source: new ol.source.OSM(),
                    preload: true
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([16.73, 53.15]),
                zoom: 10
            })
        });
    }

    ngAfterViewInit() {
        this.map.setTarget('map');
    }
}

