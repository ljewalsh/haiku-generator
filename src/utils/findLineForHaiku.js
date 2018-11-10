import Promise from 'bluebird'
import handleTweetRequest from '../tweets/handleTweetRequest'
import getNumberOfSyllables from './getSyllableCount'
import { saveItem } from '../database'
import getFirstSentence from './getFirstSentence'

const findLineForHaiku = async ({ client, keyword, numberOfSyllables }) => {
  let line = ''
    while (line === '' ) {
        const tweets = await handleTweetRequest(client, keyword)
        await Promise.each(tweets, async (tweet) => {
          const firstSentence = getFirstSentence(tweet.text)
          console.log(firstSentence)
          const numberOfSyllablesInTweet = getNumberOfSyllables(firstSentence)
          if (numberOfSyllablesInTweet === numberOfSyllables) {
            await saveItem('tweets', tweet)
            line = tweet.text
          }
        })
    }
  return line
}

export default findLineForHaiku
