import test from 'ava'
import getSyllableCount from './syllables'

test('getSyllableCount takes a tweet, splits it into words, and counts the number of syllables', (t)=> {
  const tweet = 'Here is a pretty short tweet'
  const numberOfSyllables = getSyllableCount(tweet)
  t.is(numberOfSyllables, 7)
})