import test from 'ava'
import stu from 'stu'

test.beforeEach((t) => {
  stu((mock, require) => {
    const findTweet = mock('../tweets/findTweetForHaiku').default
    const getLineForHaiku = require('./getLineForHaiku.js').default

    t.context = {
      ...t.context,
      findTweet,
      getLineForHaiku
    }
  }).mock()
})

test('keeps searching until it finds a tweet that has the correct syllable structure', async (t) => {
  const { findTweet, getLineForHaiku } = t.context
  findTweet.onCall(0).resolves('Here in California we have really extravagant purses')
  findTweet.onCall(1).resolves('Here is a sentence with exactly seventeen syllables in it')
  const line = await getLineForHaiku({ client: 'fakeClient', keyword: 'fakeKeyword', numberOfSyllables: 5 })

  t.is(findTweet.callCount, 2)
  t.is(line, 'here is a sentence')
})
