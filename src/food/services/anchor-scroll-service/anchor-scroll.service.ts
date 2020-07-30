import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

@Injectable()
export class AnchorScrollService {
  private myMessage = new Subject<string>()

  getMessage(): Observable<string> {
    return this.myMessage.asObservable()
  }

  updateMessage(message: string) {
    this.myMessage.next(message)
  }
}
