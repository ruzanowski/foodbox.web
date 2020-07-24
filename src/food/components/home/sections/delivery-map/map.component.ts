import { Component } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'delivery-map-section',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class DeliveryMapSectionComponent {
  map: mapboxgl.Map

  constructor() {}

  ngOnInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 8,
      center: [16.74, 53.15],
      accessToken: environment.mapbox.accessToken
    })
    this.map.addControl(new mapboxgl.NavigationControl())

    this.addMarkers()
  }

  addMarkers() {
    var pila = new mapboxgl.Marker().setLngLat([16.74, 53.15]).addTo(this.map)

    var walcz = new mapboxgl.Marker().setLngLat([16.465, 53.27]).addTo(this.map)

    var trzcianka = new mapboxgl.Marker()
      .setLngLat([16.45629, 53.04063])
      .addTo(this.map)

    var chodziez = new mapboxgl.Marker()
      .setLngLat([16.9198, 52.99505])
      .addTo(this.map)

    var ujscie = new mapboxgl.Marker()
      .setLngLat([16.73201, 53.05339])
      .addTo(this.map)
  }
}
