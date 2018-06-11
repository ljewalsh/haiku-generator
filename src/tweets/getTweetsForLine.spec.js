import test from 'ava'
import stu from 'stu'

test.beforeEach(async (t) => {
  let getTweetsForLine, findTweets, sleep, storeRequestInfo, getRequestInfo
  stu((mock, require) => {
    sleep = mock('sleep')
    findTweets = mock('./findTweets').default
    getRequestInfo = mock('../lastRequest/getLastRequestInfo').default
    storeRequestInfo = mock('../lastRequest/storeRequestInfo').default
    getTweetsForLine = require('./getTweetsForLine').default
  }).mock()

  const queryString = 'node'
  const sinceId = 0
  const timestamp = new Date()
  getRequestInfo.resolves({ queryString, sinceId, timestamp})

  findTweets.resolves([{ id: '1234', text: 'fakeTweet' }])


  t.context = {
    ...t.context,
    getTweetsForLine,
    storeRequestInfo,
    getRequestInfo,
    sleep,
    queryString,
    sinceId,
    timestamp
  }
})

test('storeRequestInfo is called by the function', async (t) => {
  const { getTweetsForLine, storeRequestInfo, queryString, sinceId } = t.context
  await getTweetsForLine({}, queryString, sinceId)
  t.is(storeRequestInfo.callCount, 1)
})
