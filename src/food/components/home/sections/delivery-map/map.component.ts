import { Component } from '@angular/core'
import * as mapboxgl from 'mapbox-gl'
import { environment } from '../../../../../environments/environment'
import {
  CitiesService,
  City
} from '../../../../services/cities/cities-service.service'

@Component({
  selector: 'delivery-map-section',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class DeliveryMapSectionComponent {
  map: mapboxgl.Map
  deliverableCities: City[]

  constructor(private citiesService: CitiesService) {}

  ngOnInit() {
    this.deliverableCities = this.citiesService.getDeliverableCities()
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: 7.5,
      center: [16.74, 53.15],
      accessToken: environment.mapbox.accessToken
    })
    this.map.addControl(new mapboxgl.NavigationControl())

    this.addMarkers()
  }

  addMarkers() {
    this.deliverableCities.forEach((value) => {
      new mapboxgl.Marker()
        .setLngLat([value.coords.longitude, value.coords.latitude])
        .addTo(this.map)
    })
  }
}
