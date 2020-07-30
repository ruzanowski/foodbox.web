import { Component, OnInit } from '@angular/core'
import { CitiesService } from '../../../../services/cities/cities-service.service'

@Component({
  selector: 'popular-section',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularSectionComponent implements OnInit {
  public localisations: string
  public numberOfLocalisations: number
  header: any

  constructor(foodCitiesService: CitiesService) {
    this.localisations = foodCitiesService.localisations
      .map((value) => value.name)
      .join(' ')
    this.numberOfLocalisations = foodCitiesService.numberOfLocalizations
    this.header = {
      title: 'Najsmaczniejsze zestawy',
      description: 'Ulubione zestawy wybierane przez naszych klientów.'
    }
  }

  ngOnInit(): void {}
}
