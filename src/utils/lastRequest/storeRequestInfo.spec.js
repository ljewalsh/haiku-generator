import test from 'ava'
import getLastRequestInfo from './getLastRequestInfo'
import storeRequestInfo from './storeRequestInfo'

test('storeRequestInfo stores the numberOfRequests, sinceId, and timestamp in a supplied file', async (t) => {
  const testNumberOfRequests = 0
  const testSinceId = 0
  await storeRequestInfo('testRequests', testNumberOfRequests, testSinceId)
  const lastRequest = await getLastRequestInfo('testRequests')
  t.is(lastRequest.sinceId, 0)
  t.is(lastRequest.numberOfRequests, 0)
})
