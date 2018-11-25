import Promise from 'bluebird'
import handleTweetRequest from './handleTweetRequest'
import getNumberOfSyllables from '../utils/getSyllableCount'
import { saveItem } from '../database/index'

const findLineForHaiku = async ({ client, keyword, numberOfSyllables }) => {
  let line = ''
  while (line === '') {
    const tweets = await handleTweetRequest(client, keyword)
    await Promise.each(tweets, async (tweet) => {
      const numberOfSyllablesInTweet = getNumberOfSyllables(tweet.text)
      if (numberOfSyllablesInTweet >= numberOfSyllables) {
        await saveItem('tweets', tweet)
        line = tweet.text
      }
    })
  }
  return line
}

export default findLineForHaiku
