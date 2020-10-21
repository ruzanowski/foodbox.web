import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation
} from '@angular/core'
import { finalize } from 'rxjs/operators'
import { BsModalRef } from 'ngx-bootstrap/modal'
import { AppComponentBase } from '@shared/app-component-base'
import {
  AdditionalsServiceProxy,
  AdditionalsDto
} from '@shared/service-proxies/service-proxies'
import { AppSessionService } from '../../../shared/session/app-session.service'

@Component({
  templateUrl: 'edit-additionals-dialog.component.html',
  styleUrls: ['edit-additionals-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditAdditionalsDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  additionals: AdditionalsDto = new AdditionalsDto()
  id: number

  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _additionalsService: AdditionalsServiceProxy,
    public bsModalRef: BsModalRef,
    public appSessionService: AppSessionService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this._additionalsService
      .get(this.id)
      .subscribe((result: AdditionalsDto) => {
        this.additionals = result
      })
  }

  save(): void {
    this.saving = true

    this._additionalsService
      .update(this.additionals)
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
