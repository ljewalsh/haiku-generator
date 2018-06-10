import test from 'ava'
import stu from 'stu'

test.beforeEach(async (t) => {
  let client, getTweetsForLine, getLine, sleep
  stu((mock, require) => {
    sleep = mock('sleep').sleep
    client = mock('../tweets/createTwitterClient').default
    getTweetsForLine = mock('../tweets/getTweetsForLine').default
    getLine = require('./getLine').default
  }).mock()

  t.context.sleep = sleep
  t.context.client = client
  t.context.getLine = getLine
  t.context.getTweetsForLine = getTweetsForLine
})

test('sleep is called when the request number is 180', async (t) => {
  const { client, getTweetsForLine, getLine, sleep } = t.context

  client.resolves()
  getTweetsForLine.resolves([{id: 'fakeId', text: 'fake tweet'}])

  const keyword = 'fakeKeyword'
  const numberOfSyllables = 2
  const numberOfRequests = 180
  const timestamp = new Date()
  const sinceId = 'fakeId'

  await getLine({ client, keyword, numberOfSyllables, numberOfRequests, timestamp, sinceId })

  t.is(sleep.callCount, 1)
})

test('sleep is not called when the request number is less than 180', async (t) => {
  const { client, getTweetsForLine, getLine, sleep } = t.context

  client.resolves()
  getTweetsForLine.resolves([{id: 'fakeId', text: 'fake tweet'}])

  const keyword = 'fakeKeyword'
  const numberOfSyllables = 2
  const numberOfRequests = 179
  const timestamp = new Date()
  const sinceId = 'fakeId'

  await getLine({ client, keyword, numberOfSyllables, numberOfRequests, timestamp, sinceId })

  t.is(sleep.callCount, 0)
})