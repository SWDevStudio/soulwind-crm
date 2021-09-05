import moment from "moment"

class TimeHelper {
  public static startDay(unixTime: number): number {
    return moment(unixTime * 1000)
      .startOf("day")
      .unix()
  }
}

export default TimeHelper
