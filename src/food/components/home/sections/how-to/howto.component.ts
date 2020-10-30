import { Component } from '@angular/core'

@Component({
  selector: 'how-to-section',
  templateUrl: './howto.component.html',
  styleUrls: ['./howto.component.css']
})
export class HowToSectionComponent {
  header: any
  badges: HowToBadge[]

  constructor() {
    this.badges = [
      // {
      //   id: 'one',
      //   count: 1,
      //   name: 'Podaj Adres',
      //   description: 'Sprawdź dostępność dostawy do domu.',
      //   fadeIn: '0.05s',
      //   url: 'assets/img/icon_home_1.svg'
      // },
      {
        id: 'two',
        count: 1,
        name: 'Wybierz Zestaw',
        description: 'Zgodnie z preferencjami oraz zapotrzebowaniem.',
        fadeIn: '0.1s',
        url: 'assets/img/icon_home_2.png'
      },
      {
        id: 'three',
        count: 2,
        name: 'Zapłać Online',
        description: 'Prosto, szybko oraz absolutnie bezpiecznie.',
        fadeIn: '0.15s',
        url: 'assets/img/icon_home_3.svg'
      },
      {
        id: 'four',
        count: 3,
        name: 'Wybór Dostawy',
        description: 'Dostarczymy do Ciebie według Twoich preferencji.',
        fadeIn: '0.2s',
        url: 'assets/img/icon_home_4.svg'
      }
    ]
    this.header = {
      title: 'Jak to działa',
      description: 'Trzy kroki, aby otrzymać Twój zestaw!'
    }
  }
}

export interface HowToBadge {
  id: string
  count: number
  name: string
  description: string
  fadeIn: string
  url: string
}
