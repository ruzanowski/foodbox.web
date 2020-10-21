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
  CreateCaloriesDto,
  CaloriesServiceProxy
} from '@shared/service-proxies/service-proxies'
import { AppSessionService } from '../../../shared/session/app-session.service'

@Component({
  templateUrl: 'create-calories-dialog.component.html',
  styleUrls: ['create-calories-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCaloriesDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  calories: CreateCaloriesDto = new CreateCaloriesDto()
  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _caloriesService: CaloriesServiceProxy,
    public bsModalRef: BsModalRef,
    public appSessionService: AppSessionService
  ) {
    super(injector)
  }

  ngOnInit(): void {}

  save(): void {
    this.saving = true

    this._caloriesService
      .create(this.calories)
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
