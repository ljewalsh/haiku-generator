import test from 'ava'
import stu from 'stu'

test('calls getTweetsForLine until it finds a tweet that has the correct number of syllables', (t) => {
  let getTweetsForLine, findLineForHaiku
  stu((mock, require) => {
    getTweetsForLine = mock('../tweets/getTweetsForLine').default
    findLineForHaiku = require('./findLineForHaiku').default
  }).mock()

  getTweetsForLine.onFirstCall().returns([{text: 'Here is a tweet that is way more than five syllables'}])
  getTweetsForLine.onSecondCall().returns([{text: 'Here is another tweets that is way more than five syllables'}])
  getTweetsForLine.onThirdCall().returns([{ text: 'Here is a good tweet' }])

  const line = findLineForHaiku({ client: 'fakeClient', keyword: 'fakeKeyword', numberOfSyllables: 5 })

  t.is(getTweetsForLine.callCount, 3)
})