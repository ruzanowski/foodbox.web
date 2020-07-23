import { Injectable } from '@angular/core'

@Injectable()
export class CitiesService {
  numberOfLocalizations: number
  localisations: string[]

  constructor() {
    this.localisations = ['Wałcz', 'Piła', 'Trzcianka', 'Chodzież', 'Ujście']
    this.numberOfLocalizations = this.localisations.length
  }
}
