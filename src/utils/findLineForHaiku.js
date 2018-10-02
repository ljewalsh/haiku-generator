import Promise from 'bluebird'
import getTweetsForLine from '../tweets/getTweetsForLine'
import getNumberOfSyllables from './getSyllableCount'
import { saveItem } from '../database'

const findLineForHaiku = async ({ client, keyword, numberOfSyllables }) => {
  let line = ''
  try {
    while (line === '' ) {
      const tweets = await getTweetsForLine(client, keyword)

      await Promise.each(tweets, async (tweet) => {
        await saveItem('tweets', tweet)
        const numberOfSyllablesInTweet = getNumberOfSyllables(tweet.text)
        if (numberOfSyllablesInTweet === numberOfSyllables) {
          line = tweet.text
        }
      })
    }
    return line
  } catch (err) {
    throw new Error(err.message)
  }
}

export default findLineForHaiku
