import { Component, OnInit } from '@angular/core'
import {FoodCitiesService} from '../../../../services/cities/food-cities-service.service';

@Component({
  selector: 'popular-section',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
})
export class PopularSectionComponent implements OnInit {
  public localisations: string
  public numberOfLocalisations: number

  constructor(foodCitiesService: FoodCitiesService) {
    this.localisations = foodCitiesService.localisations.join(' ')
    this.numberOfLocalisations = foodCitiesService.numberOfLocalizations
  }

  ngOnInit(): void {}
}
