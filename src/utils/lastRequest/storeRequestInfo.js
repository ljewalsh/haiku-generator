import { saveItem } from '../../database'

const storeRequestInfo = async (tableName, numberOfRequests, sinceId) => {
  return saveItem(tableName, {
    numberOfRequests,
    sinceId,
    timestamp: new Date()
  })
}

export default storeRequestInfo
