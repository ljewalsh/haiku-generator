import test from 'ava'
import stu from 'stu'

test.beforeEach(async (t) => {
  let client, getTweetsForLine, getLine, sleep, storeRequestInfo
  stu((mock, require) => {
    sleep = mock('sleep').sleep
    storeRequestInfo = mock('../lastRequest').storeRequestInfo
    client = mock('../tweets/createTwitterClient').default
    getTweetsForLine = mock('../tweets/getTweetsForLine').default
    getLine = require('./getLine').default
  }).mock()

  t.context = {
    ...t.context,
    sleep,
    client,
    getLine,
    getTweetsForLine,
    storeRequestInfo
}
})

test('storeRequestInfo is called after each call of the function', async (t) => {
  const { client, getTweetsForLine, getLine, storeRequestInfo } = t.context

  client.resolves()
  getTweetsForLine.resolves({
    tweets: [{id: 'fakeId', text: 'fake tweet'}],
    numberOfRequests: 180
  })

  const keyword = 'fakeKeyword'
  const numberOfSyllables = 2

  await getLine({ client, keyword, numberOfSyllables })

  t.is(storeRequestInfo.callCount, 1)
})