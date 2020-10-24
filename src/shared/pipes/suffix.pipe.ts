import { Injector, Pipe, PipeTransform } from '@angular/core'
import { AppComponentBase } from '../app-component-base'

@Pipe({
  name: 'suffix'
})
export class SuffixPipe extends AppComponentBase implements PipeTransform {
  constructor(injector: Injector) {
    super(injector)
  }

  transform(key: any, suffix: string): string {
    return key === undefined || key === null ? key : key + suffix
  }
}
