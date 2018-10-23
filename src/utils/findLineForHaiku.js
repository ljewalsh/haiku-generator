import Promise from 'bluebird'
import getTweetsForLine from '../tweets/getTweetsForLine'
import getNumberOfSyllables from './getSyllableCount'
import { saveItem } from '../database'

const findLineForHaiku = async ({ client, keyword, numberOfSyllables }) => {
  let line = ''
    while (line === '' ) {
        const tweets = await getTweetsForLine(client, keyword)
        await Promise.each(tweets, async (tweet) => {
          const numberOfSyllablesInTweet = getNumberOfSyllables(tweet.text)
          if (numberOfSyllablesInTweet === numberOfSyllables) {
            await saveItem('tweets', tweet)
            line = tweet.text
          }
        })
    }
  return line
}

export default findLineForHaiku
