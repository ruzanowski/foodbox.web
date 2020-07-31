import { Component } from '@angular/core'

@Component({
  selector: 'order-info-section',
  templateUrl: './info-section.component.html',
  styleUrls: ['./info-section.component.scss']
})
export class InfoSectionComponent {
  firstBadge: any
  secondBadge: any

  constructor() {
    this.firstBadge = {
      title: 'Czas dostawy',
      description:
        'Dostarczamy w godzinach nocnych od 1:00 do 06:00. Postaraj się zapewnić miejsce dla kuriera gdzie mógłby zostawić Twoje zamówienie.',
      icon: 'icon_clock_alt'
    }
    this.secondBadge = {
      title: 'Bezgotówkowo',
      description:
        'Szybkie, bezpieczne płatności to nasz priorytet. Obsługujemy tylko i wyłącznie bezgotówkowo naszych klientów.',
      icon: 'icon_creditcard'
    }
  }
}
