import moment from 'moment'
import { readFileSync, writeFile } from 'fs'

const LAST_REQUEST_INFO = './lastRequestInfo.json'

const checkTimestamp = (numberOfRequests, timestamp) => {
  const fifteenMinutesAgo = moment().subtract(15, 'minute').utc()
  const lastRequestDateTime = moment(timestamp).utc()
  if (lastRequestDateTime < fifteenMinutesAgo){
    numberOfRequests = 0
  }
  return numberOfRequests
}

const getLastRequestInfo = async () => {
  const lastRequestInfo = await JSON.parse(readFileSync(LAST_REQUEST_INFO, 'utf8'))
  return lastRequestInfo
}

const storeRequestInfo = async (numberOfRequests, sinceId) => {
  return writeFile(LAST_REQUEST_INFO, JSON.stringify({
    numberOfRequests,
    sinceId,
    timestamp: new Date()
  }), 'utf8')
}

export {
  checkTimestamp,
  getLastRequestInfo,
  storeRequestInfo
}