import { Injectable } from '@angular/core'

@Injectable()
export class CitiesService {
  numberOfLocalizations: number
  localisations: City[]

  constructor() {
    this.localisations = [
      {
        name: 'Piła',
        coords: {
          longitude: 16.74,
          latitude: 53.15
        }
      },
      {
        name: 'Wałcz',
        coords: {
          longitude: 16.465,
          latitude: 53.27
        }
      },
      {
        name: 'Trzcianka',
        coords: {
          longitude: 16.45629,
          latitude: 53.04063
        }
      },
      {
        name: 'Chodzież',
        coords: {
          longitude: 16.9198,
          latitude: 52.99505
        }
      },
      {
        name: 'Ujście',
        coords: {
          longitude: 16.73201,
          latitude: 53.05339
        }
      },
      {
        name: 'Czaplinek',
        coords: {
          longitude: 16.2333324,
          latitude: 53.5499978
        }
      }
    ]
    this.numberOfLocalizations = this.localisations.length
  }

  getDeliverableCities() {
    return this.localisations
  }
}

export interface City {
  name: string
  coords: Coordinates
}

export interface Coordinates {
  longitude: number
  latitude: number
}
