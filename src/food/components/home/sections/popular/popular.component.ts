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

  constructor(private foodCitiesService: CitiesService) {}

  ngOnInit(): void {
    this.localisations = this.foodCitiesService.localisations
      .map((city) => city.name)
      .join(' ')
    this.numberOfLocalisations = this.foodCitiesService.numberOfLocalizations
    this.header = {
      title: 'Nasze zestawy',
      description: 'Ulubione zestawy wybierane przez naszych klientów.'
    }
  }
}
