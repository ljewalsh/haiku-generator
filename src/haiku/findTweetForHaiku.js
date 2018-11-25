import Promise from 'bluebird'
import handleTweetRequest from '../tweets/handleTweetRequest'
import getNumberOfSyllables from '../utils/getSyllableCount'
import { saveItem } from '../database/index'

const makeFirstLetterLowercase = (line) => {
  return line.charAt(0).toLowerCase() + line.slice(1)
}

const findTweetForHaiku = async ({ client, query, numberOfSyllables }) => {
  let line = ''
  while (line === '') {
    const tweets = await handleTweetRequest(client, query)
    await Promise.each(tweets, async (tweet) => {
      const numberOfSyllablesInTweet = getNumberOfSyllables(tweet.text)
      if (numberOfSyllablesInTweet === numberOfSyllables) {
        await saveItem('tweets', tweet)
        line = makeFirstLetterLowercase(tweet.text)
      }
    })
  }
  return line
}

export default findTweetForHaiku
