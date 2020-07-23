import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core'
import { Appearance } from '@angular-material-extensions/google-maps-autocomplete'
import { FormControl, FormGroup } from '@angular/forms'
import { appModuleAnimation } from '../../../../../shared/animations/routerTransition'

@Component({
  selector: 'food-home-search',
  templateUrl: './home-search-section.component.html',
  styleUrls: ['./home-search-section.component.css'],
  animations: [appModuleAnimation()]
})
export class HomeSearchSectionComponent implements OnInit, AfterViewInit {
  @Input() adressType: string
  @Output() setAddress: EventEmitter<any> = new EventEmitter()
  @ViewChild('addresstext') addresstext: any
  public appearance = Appearance
  public zoom: number
  public latitude: number
  public longitude: number
  addressFormGroup: FormGroup
  constructor() {}

  ngOnInit() {
    this.zoom = 10
    this.latitude = 52.520008
    this.longitude = 13.404954

    this.setCurrentPosition()
    this.addressFormGroup = new FormGroup({
      address: new FormControl()
    })
    this.addressFormGroup
      .get('address')
      .valueChanges.subscribe((value) => console.log('value changed', value))
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete()
  }

  invokeEvent(place: Object) {
    this.setAddress.emit(place)
  }

  onLocationSelected(location: any) {
    console.log('onLocationSelected: ', location)
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addresstext.nativeElement,
      {
        types: [this.adressType]
      }
    )
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace()
      this.invokeEvent(place)
    })
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude
        this.longitude = position.coords.longitude
        this.zoom = 12
        console.log('current location is : ' + position)
      })
    }
  }
}
