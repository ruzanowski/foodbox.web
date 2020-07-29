import { Component } from '@angular/core'

@Component({
  selector: 'payment-methods-section',
  templateUrl: './payment-methods-section.component.html',
  styleUrls: ['./payment-methods-section.component.scss']
})
export class PaymentMethodsSectionComponent {
  paymentSelected: string = ''
}
