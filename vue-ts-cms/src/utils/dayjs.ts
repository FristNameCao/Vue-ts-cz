import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

export function formatUtc(
  utcString: string,
  defaultTime = 'YYYY/MM/DD HH:mm:ss'
) {
  dayjs.extend(utc)
  const resultTime = dayjs.utc(utcString).utcOffset(8).format(defaultTime)

  return resultTime
}
