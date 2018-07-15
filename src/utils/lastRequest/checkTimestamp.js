import moment from 'moment'

const checkTimestamp = (numberOfRequests, timestamp) => {
  const fifteenMinutesAgo = moment().subtract(15, 'minute').utc()
  const lastRequestDateTime = moment(timestamp).utc()
  if (lastRequestDateTime < fifteenMinutesAgo) {
    numberOfRequests = 0
  }
  return numberOfRequests
}

export default checkTimestamp
