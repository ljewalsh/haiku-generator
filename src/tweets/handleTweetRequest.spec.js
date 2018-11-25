import test from 'ava'
import stu from 'stu'

test.beforeEach(async (t) => {
  let handleTweetRequest, findTweets, storeRequestInfo, getLastRequestInfo
  stu((mock, require) => {
    findTweets = mock('./findTweets').default
    getLastRequestInfo = mock('../utils/lastRequest/getLastRequestInfo').default
    storeRequestInfo = mock('../utils/lastRequest/storeRequestInfo').default
    handleTweetRequest = require('./handleTweetRequest').default
  }).mock()

  const queryString = 'node'
  const numberOfRequests = 0
  const firstSinceId = 12
  getLastRequestInfo.resolves({ sinceId: firstSinceId, numberOfRequests })
  storeRequestInfo.resolves()

  t.context = {
    ...t.context,
    handleTweetRequest,
    storeRequestInfo,
    getLastRequestInfo,
    findTweets,
    numberOfRequests,
    queryString,
    firstSinceId
  }
})

test('findTweets in called by the function with the correct args', async (t) => {
  const {
    handleTweetRequest,
    findTweets,
    queryString,
    firstSinceId
  } = t.context

  findTweets.resolves([{ id: firstSinceId, text: 'fakeTweet' }])

  await handleTweetRequest(null, queryString)

  t.is(findTweets.callCount, 1)

  const expectedFindTweetsArgs = [ null, queryString, firstSinceId ]
  t.deepEqual(findTweets.args, [ expectedFindTweetsArgs ])
})

test('storeRequestInfo is called with the correct args', async (t) => {
  const {
    handleTweetRequest,
    storeRequestInfo,
    queryString,
    numberOfRequests,
    findTweets
  } = t.context

  const secondSinceId = 13
  findTweets.resolves([{ id: secondSinceId, text: 'fakeTweet' }])
  await handleTweetRequest(null, queryString)
  t.is(storeRequestInfo.callCount, 1)

  const expectedStoreRequestInfoArgs = [ 'requests', numberOfRequests + 1, secondSinceId ]
  t.deepEqual(storeRequestInfo.args, [ expectedStoreRequestInfoArgs ])
})

test('can handle when no tweets are returned from findTweets', async (t) => {
  const {
    handleTweetRequest,
    queryString,
    findTweets
  } = t.context

  findTweets.resolves([])
  const tweets = await handleTweetRequest(null, queryString)
  t.deepEqual(tweets, [])
})
