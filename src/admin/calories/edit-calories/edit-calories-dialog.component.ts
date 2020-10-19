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
  CaloriesServiceProxy,
  CaloriesDto
} from '@shared/service-proxies/service-proxies'
import { ItemsService } from '../../../food/services/items-service/items.service'

@Component({
  templateUrl: 'edit-calories-dialog.component.html',
  styleUrls: ['edit-calories-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditCaloriesDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false
  calories: CaloriesDto = new CaloriesDto()
  id: number

  @Output() onSave = new EventEmitter<any>()

  constructor(
    injector: Injector,
    public _caloriesService: CaloriesServiceProxy,
    public bsModalRef: BsModalRef,
    public itemsService: ItemsService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    this._caloriesService.get(this.id).subscribe((result: CaloriesDto) => {
      this.calories = result
    })
  }

  save(): void {
    this.saving = true

    this._caloriesService
      .update(this.calories)
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
