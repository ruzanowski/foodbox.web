import { Component, OnInit } from '@angular/core'
import { CitiesService } from '../../../../services/cities/cities-service.service'

@Component({
  selector: 'popular-section',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
})
export class PopularSectionComponent implements OnInit {
  public localisations: string
  public numberOfLocalisations: number

  constructor(foodCitiesService: CitiesService) {
    this.localisations = foodCitiesService.localisations.join(' ')
    this.numberOfLocalisations = foodCitiesService.numberOfLocalizations
  }

  ngOnInit(): void {}
}
