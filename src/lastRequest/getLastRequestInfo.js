import { readFileSync } from 'fs'
import checkTimestamp from './checkTimestamp'

const LAST_REQUEST_INFO = './lastRequestInfo.json'

const getLastRequestInfo = async (jsonFile = LAST_REQUEST_INFO) => {
  const { numberOfRequests, sinceId, timestamp } = JSON.parse(readFileSync(jsonFile, 'utf8'))
  const checkedNumberOfRequests = checkTimestamp(numberOfRequests, timestamp)
  return {
    sinceId,
    timestamp,
    numberOfRequests: checkedNumberOfRequests
  }
}

export default getLastRequestInfo
