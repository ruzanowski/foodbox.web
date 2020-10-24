import {
  Component,
  Injector,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core'
import { OrderService } from '../../../../services/order-service/order.service'
import { MatDialog } from '@angular/material/dialog'
import { AppSessionService } from '../../../../../shared/session/app-session.service'
import { finalize } from 'rxjs/operators'
import { OrderServiceProxy } from '../../../../../shared/service-proxies/service-proxies'
import { AppComponentBase } from '../../../../../shared/app-component-base'
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'basket-section',
  templateUrl: './basket-section.component.html',
  styleUrls: ['./basket-section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BasketSectionComponent extends AppComponentBase implements OnInit {
  @Input()
  previousLink: string

  @Input()
  nextLink: string

  previousLinkExists: boolean

  constructor(
    injector: Injector,
    public orderService: OrderService,
    public appSessionService: AppSessionService,
    public dialog: MatDialog
  ) {
    super(injector)
  }

  ngOnInit() {
    this.previousLinkExists = this.previousLink !== undefined
  }

  submit() {
    this.orderService.submit().subscribe(() => {
      this.notify.success(this.l('Pomyślnie utworzono'))
    })
  }
}
