import test from 'ava'
import stu from 'stu'

test('calls handleTweetRequest until it finds a tweet that has the correct number of syllables', async (t) => {
  let handleTweetRequest, findTweetForHaiku
  stu((mock, require) => {
    handleTweetRequest = mock('../tweets/handleTweetRequest').default
    findTweetForHaiku = require('./findTweetForHaiku').default
  }).mock()

  handleTweetRequest.onFirstCall().returns([{ text: 'Here is a tweet' }])
  handleTweetRequest.onSecondCall().returns([{ text: 'Here is another tweet' }])
  handleTweetRequest.onThirdCall().returns([{ text: 'Here is the correct length tweet' }])

  const line = await findTweetForHaiku({ client: 'fakeClient', keyword: 'fakeKeyword', numberOfSyllables: 7 })

  t.is(line, 'here is the correct length tweet')
  t.is(handleTweetRequest.callCount, 3)
})
