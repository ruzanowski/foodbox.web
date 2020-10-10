import * as moment from 'moment'

export class DatesHelper {
  static getDates(startDate, stopDate) : Date[] {
    var dateArray = []
    var currentDate = moment(startDate)
    var stopDate2 = moment(stopDate)
    while (currentDate <= stopDate2) {
      dateArray.push(moment(currentDate).format('YYYY-MM-DD'))
      currentDate = moment(currentDate).add(1, 'days')
    }
    return dateArray
  }

  static addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days)
    return date
  }
}
