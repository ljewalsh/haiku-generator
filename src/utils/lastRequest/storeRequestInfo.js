import { writeFileSync } from 'fs'

const LAST_REQUEST_INFO = './lastRequestInfo.json'

const storeRequestInfo = async (numberOfRequests, sinceId, jsonFile = LAST_REQUEST_INFO) => {
  return writeFileSync(jsonFile, JSON.stringify({
    numberOfRequests: numberOfRequests,
    sinceId: sinceId,
    timestamp: new Date()
  }), 'utf8')
}

export default storeRequestInfo
