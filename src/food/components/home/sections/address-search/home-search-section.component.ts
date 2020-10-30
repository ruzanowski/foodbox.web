import { Component } from '@angular/core'
import { appModuleAnimation } from '../../../../../shared/animations/routerTransition'
import {
  CitiesService,
  City
} from '../../../../services/cities/cities-service.service'
import { AppConsts } from '../../../../../shared/AppConsts'
import { AnchorScrollService } from '../../../../services/anchor-scroll-service/anchor-scroll.service'

@Component({
  selector: 'home-search',
  templateUrl: './home-search-section.component.html',
  styleUrls: ['./home-search-section.component.scss'],
  animations: [appModuleAnimation()]
})
export class HomeSearchSectionComponent {
  deliverableCities: City[]
  header: any
  faqSectionId: string

  constructor(
    private citiesService: CitiesService,
    private anchorScrollService: AnchorScrollService
  ) {
    this.deliverableCities = citiesService.getDeliverableCities()
    this.header = {
      title: 'Fitruna Dieta Pudełkowa',
      description: 'Dieta jaką potrzebujesz. Z dostawą pod Twoje drzwi.'
    }
    this.faqSectionId = AppConsts.sectionsIds.faq
  }

  scroll(id) {
    this.anchorScrollService.updateMessage(id)
  }
}
