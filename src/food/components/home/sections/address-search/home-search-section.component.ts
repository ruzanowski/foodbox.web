import { Component } from '@angular/core'
import { appModuleAnimation } from '../../../../../shared/animations/routerTransition'
import {
  CitiesService,
  City
} from '../../../../services/cities/cities-service.service'

@Component({
  selector: 'food-home-search',
  templateUrl: './home-search-section.component.html',
  styleUrls: ['./home-search-section.component.css'],
  animations: [appModuleAnimation()]
})
export class HomeSearchSectionComponent {
  deliverableCities: City[]
  header: any

  constructor(private citiesService: CitiesService) {
    this.deliverableCities = citiesService.getDeliverableCities()
    this.header = {
      title: 'Twoja Dieta Pudełkowa',
      description: 'Sprawdź dostępność dostawy do Ciebie.'
    }
  }
}
