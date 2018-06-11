import test from 'ava'
import getLastRequestInfo from './getLastRequestInfo'

test('getLastRequestInfo retrieves the timestamp, sinceId, and numberOfRequests from the lastRequestInfo file', async (t) => {
  const { timestamp, sinceId, numberOfRequests } = await getLastRequestInfo('./testHelpers/test.json')
  t.is(typeof timestamp, 'string')
  t.is(typeof sinceId, 'number')
  t.is(typeof numberOfRequests, 'number')
})
