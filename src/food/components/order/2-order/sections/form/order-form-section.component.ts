import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { CreateOrderFormDto } from '../../../../../../shared/service-proxies/service-proxies'
import { OrderService } from '../../../../../services/order-service/order.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'order-form-section',
  templateUrl: './order-form-section.component.html',
  styleUrls: ['./order-form-section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderFormSectionComponent implements OnInit {
  mainForm: FormGroup
  orderForm: CreateOrderFormDto

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderForm = this.orderService.form
    this.mainForm = new FormGroup({
      firstName: new FormControl(undefined, []),
      lastName: new FormControl(undefined, [
        Validators.min(1),
        Validators.required
      ]),
      phoneNumber: new FormControl(undefined, [Validators.required]),
      email: new FormControl(undefined, [
        Validators.required,
        Validators.pattern(
          new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        )
      ]),
      postCode: new FormControl(undefined, [Validators.required]),
      city: new FormControl(undefined, [Validators.required]),
      street: new FormControl(undefined, [Validators.required]),
      buildingNumber: new FormControl(undefined, [Validators.required]),
      flatNumber: new FormControl(undefined),
      gateAccessCode: new FormControl(undefined),
      remarks: new FormControl(undefined)
    })
  }

  submit() {
    this.orderService.form = CreateOrderFormDto.fromJS(this.orderForm)
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.mainForm.controls[controlName].hasError(errorName)
  }
}
