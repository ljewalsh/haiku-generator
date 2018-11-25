import test from 'ava'
import extractSyllables from './extractSyllables'

test('takes a tweet and extracts out a number of syllables', async (t) => {
  const tweet = 'here is a sentence with exactly seventeen syllables in it'
  const line = extractSyllables({ tweet, numberOfSyllables: 5 })

  t.is(line, 'here is a sentence')
})

test('should throw an error when the syllables of the tweet do not fit the haiku structure', async (t) => {
  const tweet = 'here in California we have really extravagant purses'
  try {
    extractSyllables({ tweet, numberOfSyllables: 5 })
  } catch (err) {
    t.is(err.message, 'tweet cannot be turned into haiku')
  }
})
