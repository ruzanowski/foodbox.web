import { Component } from '@angular/core'
import { appModuleAnimation } from '../../../../../shared/animations/routerTransition'
import {
  CitiesService,
  City
} from '../../../../services/cities/cities-service.service'

@Component({
  selector: 'home-search',
  templateUrl: './home-search-section.component.html',
  styleUrls: ['./home-search-section.component.scss'],
  animations: [appModuleAnimation()]
})
export class HomeSearchSectionComponent {
  deliverableCities: City[]
  header: any

  constructor(private citiesService: CitiesService) {
    this.deliverableCities = citiesService.getDeliverableCities()
    this.header = {
      title: 'Dieta pudełkowa',
      description: 'Dieta jaką potrzebujesz. Dostawa, pod Twoje drzwi.'
    }
  }
}
