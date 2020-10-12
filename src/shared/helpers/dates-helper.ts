import { CreateDeliveryTimeDto } from '../service-proxies/service-proxies'
import { FoodMenuDialog } from '../../food/models/food-menu-dialog'

export class DatesHelper {
  static addDays(currentDate) {
    let date = new Date(currentDate)
    date.setDate(date.getDate() + 1)
    return date
  }

  static getDates(startDate: Date, endDate: Date) {
    let dates: Date[] = []
    let currentDate: Date = startDate
    while (currentDate <= endDate) {
      dates.push(currentDate)
      currentDate = this.addDays(currentDate)
    }

    return dates
  }
  static getDeliveryTimes(dialog: FoodMenuDialog) {
    let deliveryTimes: CreateDeliveryTimeDto[] = []
    let endDate = new Date(dialog.startDate)
    endDate.setDate(dialog.startDate.getDate() + dialog.periodLengthInDays - 1)

    DatesHelper.getDates(dialog.startDate, endDate).forEach((date) => {
      let toPush
      toPush = CreateDeliveryTimeDto.fromJS({
        dateTime: date
      })

      deliveryTimes.push(toPush)
    })
    return deliveryTimes
  }
}
