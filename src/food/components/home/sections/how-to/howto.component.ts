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
      {
        id: 'one',
        count: 1,
        name: 'Podaj Adres',
        description: 'Sprawdź dostępność dostawy do domu.',
        fadeIn: '0.1s'
      },
      {
        id: 'two',
        count: 2,
        name: 'Dobierz Plan',
        description: 'Zgodnie z preferencjami oraz zapotrzebowaniem.',
        fadeIn: '0.2s'
      },
      {
        id: 'three',
        count: 3,
        name: 'Płatność Bezgotówkowa',
        description: 'Prosto, szybko oraz absolutnie bezpiecznie.',
        fadeIn: '0.3s'
      },
      {
        id: 'four',
        count: 4,
        name: 'Wybór Dostawy',
        description: 'Dostarczymy do Ciebie według Twoich preferencji.',
        fadeIn: '0.4s'
      }
    ]
    this.header = {
      title: 'Jak to działa',
      description: 'Cztery kroki, aby otrzymać Twój zestaw!'
    }
  }
}

export interface HowToBadge {
  id: string
  count: number
  name: string
  description: string
  fadeIn: string
}
