import test from 'ava'
import { readFileSync } from 'fs'
import storeRequestInfo from './storeRequestInfo'

test('storeRequestInfo stores the numberOfRequests, sinceId, and timestamp in a supplied file', async (t) => {
  const testFile = './testHelpers/test.json'
  const testNumberOfRequests = 0
  const testSinceId = 0
  await storeRequestInfo(testNumberOfRequests, testSinceId, testFile)
  const { numberOfRequests, sinceId, timestamp } = JSON.parse(readFileSync(testFile, 'utf8'))
  t.is(testNumberOfRequests, numberOfRequests)
  t.is(testSinceId, sinceId)
  t.is(typeof timestamp, 'string')
})
