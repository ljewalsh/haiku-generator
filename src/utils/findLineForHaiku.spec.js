import test from 'ava'
import stu from 'stu'

test('calls handleTweetRequest until it finds a tweet that has the correct number of syllables', (t) => {
  let handleTweetRequest, findLineForHaiku
  stu((mock, require) => {
    handleTweetRequest = mock('../tweets/handleTweetRequest').default
    findLineForHaiku = require('./findLineForHaiku').default
  }).mock()

  handleTweetRequest.onFirstCall().returns([{text: 'Here is a tweet that is way more than five syllables'}])
  handleTweetRequest.onSecondCall().returns([{text: 'Here is another tweets that is way more than five syllables'}])
  handleTweetRequest.onThirdCall().returns([{ text: 'Here is a good tweet' }])

  const line = findLineForHaiku({ client: 'fakeClient', keyword: 'fakeKeyword', numberOfSyllables: 5 })

  t.is(handleTweetRequest.callCount, 3)
})