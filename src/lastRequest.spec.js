import test from 'ava'
import moment from 'moment'
import { checkTimestamp } from './lastRequest'

test('checkTimestamp returns with 0 when the timestamp is from more than 15 minutes ago', (t) => {
  const lastRequestTimestamp = moment().subtract(16, 'minute').utc()
  const numberOfRequests = 40
  const newNumberOfRequests = checkTimestamp(numberOfRequests, lastRequestTimestamp)
  t.is(newNumberOfRequests, 0)
})

test('checkTimestamp returns the precious numberOfRequests when the timestamp is from less than 15 minutes ago', (t) => {
  const lastRequestTimestamp = moment().subtract(13, 'minute').utc()
  const numberOfRequests = 40
  const newNumberOfRequests = checkTimestamp(numberOfRequests, lastRequestTimestamp)
  t.is(newNumberOfRequests, 40)
})