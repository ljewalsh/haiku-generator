import { forEach, last } from 'ramda'
import { checkTimestamp, storeRequestInfo } from '../lastRequest'
import getTweetsForLine from '../tweets/getTweetsForLine'
import getNumberOfSyllables from './getSyllableCount'
import sleep from 'sleep'

const getLine = async ({ client, keyword, numberOfSyllables, numberOfRequests, timestamp, sinceId }) => {
  try {
    let line = ''
    while (line === '') {
      numberOfRequests = checkTimestamp(numberOfRequests, timestamp)
      if (numberOfRequests === 180) {
        console.log('waiting request timeout')
        sleep.sleep(900)
      }

      const tweets = await getTweetsForLine(client, keyword, sinceId)

      const lastTweet = last(tweets)
      sinceId = lastTweet.id
      numberOfRequests += 1
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