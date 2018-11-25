import { findLastItem } from '../../database'
import checkTimestamp from './checkTimestamp'

const getLastRequestInfo = async (tableName) => {
  const lastItem = await findLastItem(tableName)
  let lastRequestInfo = {}
  if (lastItem) {
    const { timestamp, numberOfRequests, sinceId } = lastItem
    const checkedNumberOfRequests = checkTimestamp(numberOfRequests, timestamp)
    lastRequestInfo = {
      sinceId,
      timestamp,
      numberOfRequests: checkedNumberOfRequests
    }
  } else {
    lastRequestInfo = {
      sinceId: 0,
      timeStamp: new Date(),
      numberOfRequests: 0
    }
  }
  return lastRequestInfo
}

export default getLastRequestInfo
