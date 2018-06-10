import { forEach, last } from 'ramda'
import { storeRequestInfo } from '../lastRequest'
import getTweetsForLine from '../tweets/getTweetsForLine'
import getNumberOfSyllables from './getSyllableCount'

const getLine = async ({ client, keyword, numberOfSyllables }) => {

  try {
    let line = ''
    while (line === '') {

      let { numberOfRequests, tweets } = await getTweetsForLine(client, keyword)

      const lastTweet = last(tweets)
      const sinceId = lastTweet.id
      await storeRequestInfo(numberOfRequests, sinceId)

      forEach((tweet) => {
        const numOfSyllables = getNumberOfSyllables(tweet.text)
        if (numOfSyllables === numberOfSyllables) {
          line = tweet.text
        }
      }, tweets)
    }
    return line
  }
  catch(err){
    throw new Error(err.message)
  }
}

export default getLine