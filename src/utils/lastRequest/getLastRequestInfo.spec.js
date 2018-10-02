import test from 'ava'
import moment from 'moment'
import {createTable, saveItem} from '../../database'
import getLastRequestInfo from './getLastRequestInfo'

test.serial('Updates number of requests to 0 if the request occurred more than 15 minutes ago', async (t) => {
  const request = {
    timestamp: moment().subtract(20, 'minutes').toDate(),
    sinceId: '12345',
    numberOfRequests: 800
  }
  await createTable('testRequests')
  await saveItem('testRequests', request)
  const lastRequest = await getLastRequestInfo('testRequests')
  t.deepEqual(lastRequest.timestamp, request.timestamp)
  t.is(lastRequest.sinceId, request.sinceId)
  t.is(lastRequest.numberOfRequests, 0)
})

test.serial('retrieves the timestamp, sinceId, and numberOfRequests from the lastRequestInfo item', async (t) => {
  const firstRequest = {
    timestamp: moment().subtract(15, 'minutes').toDate(),
    sinceId: '',
    numberOfRequests: 0
  }
  const secondRequest = {
    timestamp: new Date(),
    sinceId: '12345',
    numberOfRequests: 800
  }
  await createTable('testRequests')
  await saveItem('testRequests', firstRequest)
  await saveItem('testRequests', secondRequest)
  const lastRequest = await getLastRequestInfo('testRequests')
  t.deepEqual(lastRequest.timestamp, secondRequest.timestamp)
  t.is(lastRequest.sinceId, secondRequest.sinceId)
  t.is(lastRequest.numberOfRequests, secondRequest.numberOfRequests)
})
