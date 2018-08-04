import test from 'ava'
import stu from 'stu'

test.beforeEach(async (t) => {
  let getTweetsForLine, findTweets, storeRequestInfo, getLastRequestInfo
  stu((mock, require) => {
    findTweets = mock('./findTweets').default
    getLastRequestInfo = mock('../utils/lastRequest/getLastRequestInfo').default
    storeRequestInfo = mock('../utils/lastRequest/storeRequestInfo').default
    getTweetsForLine = require('./getTweetsForLine').default
  }).mock()

  const queryString = 'node'
  const firstSinceId = 12
  const secondSinceId = 13
  const numberOfRequests = 0
  getLastRequestInfo.resolves({ sinceId: firstSinceId, numberOfRequests })
  storeRequestInfo.resolves()

  findTweets.resolves([{ id: secondSinceId, text: 'fakeTweet' }])


  t.context = {
    ...t.context,
    getTweetsForLine,
    storeRequestInfo,
    getLastRequestInfo,
    findTweets,
    numberOfRequests,
    queryString,
    firstSinceId,
    secondSinceId
  }
})

test('getLastRequestInfo is called with the correct args', async (t) => {
  const {
    getTweetsForLine,
    getLastRequestInfo,
    queryString
  } = t.context

  const fakeFile = 'requestFile'
  await getTweetsForLine(null, queryString, fakeFile)
  t.is(getLastRequestInfo.callCount, 1)
  t.truthy(getLastRequestInfo.calledWith(fakeFile))
})

test('findTweets in called by the function with the correct args', async (t) => {
  const {
    getTweetsForLine,
    findTweets,
    queryString,
    firstSinceId
  } = t.context

  const fakeFile = 'requestFile'
  await getTweetsForLine(null, queryString, fakeFile)

  t.is(findTweets.callCount, 1)

  const expectedFindTweetsArgs = [ null, queryString, firstSinceId ]
  t.deepEqual(findTweets.args, [ expectedFindTweetsArgs ])
})

test('storeRequestInfo is called with the correct args', async (t) => {
  const {
    getTweetsForLine,
    storeRequestInfo,
    queryString,
    secondSinceId,
    numberOfRequests
  } = t.context

  const fakeFile = 'requestFile'
  await getTweetsForLine(null, queryString, fakeFile)
  t.is(storeRequestInfo.callCount, 1)

  const expectedStoreRequestInfoArgs = [ numberOfRequests + 1, secondSinceId, fakeFile ]
  t.deepEqual(storeRequestInfo.args, [ expectedStoreRequestInfoArgs  ])
})
