import test from 'ava'
import stu from 'stu'

test('', async (t) => {
  let createHaiku, getLine, createTwitterClient, getKeyword
  stu((mock, require) => {
    createTwitterClient = mock('../tweets/createTwitterClient').default
    getLine = mock('../utils/getLine').default
    getKeyword = mock('../utils/keywords').default
    createHaiku = require('./createHaiku').default
  }).mock()

  createTwitterClient.resolves()
  getLine.resolves()
  getKeyword.returns('keyword')

  const haiku = await createHaiku()

  t.is(createTwitterClient.callCount, 1)
  t.is(getLine.callCount, 3)
  const firstCall = getLine.args[0]
  const secondCall = getLine.args[1]
  const thirdCall = getLine.args[2]
  t.deepEqual(firstCall, [{ client: undefined, keyword: 'keyword', numberOfSyllables: 5 }])
  t.deepEqual(secondCall, [{ client: undefined, keyword: 'keyword', numberOfSyllables: 7 }])
  t.deepEqual(thirdCall, [{ client: undefined, keyword: 'keyword', numberOfSyllables: 5 }])
  t.is(haiku.length, 3)
})
