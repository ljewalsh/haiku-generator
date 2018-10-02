import { findLastItem } from '../../database'
import checkTimestamp from './checkTimestamp'

const getLastRequestInfo = async (tableName) => {
  const { timestamp, numberOfRequests, sinceId } = await findLastItem(tableName)
  const checkedNumberOfRequests = checkTimestamp(numberOfRequests, timestamp)
  return {
    sinceId,
    timestamp,
    numberOfRequests: checkedNumberOfRequests
  }
}

export default getLastRequestInfo
