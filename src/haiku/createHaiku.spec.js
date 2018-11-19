import test from 'ava'
import stu from 'stu'

test.beforeEach((t)=> {
  stu((mock, require) => {
    const findTweets = mock('../tweets/findTweets').default
    const getKeyword = mock('../utils/keywords').default
    const createHaiku = require('./createHaiku').default

    t.context = {
      ...t.context,
      findTweets,
      getKeyword,
      createHaiku
    }
  }).mock()
})

test.serial('keeps looking for tweets even when there is no response from twitter', async (t) => {
  const { createHaiku, findTweets, getKeyword } = t.context
  findTweets.onCall(0).resolves([{id: '1', text: 'here is a sentence with exactly seventeen syllables in it'}])
  findTweets.onCall(1).resolves([{id: '2', text: 'with exactly seventeen syllables'}])
  const error = new Error()
  error.code = 'ECONNRESET'
  findTweets.onCall(2).throws(error)
  findTweets.onCall(3).resolves([{id: '3', text: 'syllables in it'}])
  getKeyword.returns('keyword')

  const haiku = await createHaiku()

  t.is(findTweets.callCount, 4)
  t.deepEqual(haiku, ['here is a sentence', 'with exactly seventeen', 'syllables in it'])
})
