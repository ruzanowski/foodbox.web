import {
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { AppComponentBase } from '@shared/app-component-base'
import {
  CreateAdditionalsDto,
  AdditionalsServiceProxy
} from '@shared/service-proxies/service-proxies'
import { AppSessionService } from '../../../shared/session/app-session.service'

@Component({
  templateUrl: 'create-additionals-dialog.component.html',
  styleUrls: ['create-additionals-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateAdditionalsDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  additionals: CreateAdditionalsDto = new CreateAdditionalsDto()
  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _additionalsService: AdditionalsServiceProxy,
    public bsModalRef: BsModalRef,
    public appSessionService: AppSessionService
  ) {
    super(injector)
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true

    this._additionalsService
      .create(this.additionals)
      .pipe(
        finalize(() => {
          this.saving = false
        })
      )
      .subscribe(() => {
        this.notify.info(this.l('Pomyślnie zapisano'))
        this.bsModalRef.hide()
        this.onSave.emit()
      })
  }
}
