import test from 'ava'
import getFirstSentence from './getFirstSentence'

test('finds the first sentence in a tweet', (t) => {
  const tweet = 'First sentence. Second sentence. Third sentence'
  const firstSentence = getFirstSentence(tweet)
  t.is(firstSentence, 'First sentence')
})

test('returns whole tweet if it cant find a sentence', (t) => {
  const tweet = 'here is the whole tweet'
  const firstSentence = getFirstSentence(tweet)
  t.is(firstSentence, 'here is the whole tweet')
})