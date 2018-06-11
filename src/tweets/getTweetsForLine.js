import { last, map } from 'ramda'
import sleep from 'sleep'
import getLastRequestInfo from '../lastRequest/getLastRequestInfo'
import findTweets from './findTweets'
import storeRequestInfo from '../lastRequest/storeRequestInfo'
import cleanTweet from './cleanTweet'

const checkForTimeout = async (numberOfRequests) => {
  if (numberOfRequests === 180) {
    console.log('waiting request timeout')
    await sleep.sleep(900)
    return 0
  }
  return numberOfRequests
}

const getTweetInfo = (tweet) => {
  const cleanedTweet = cleanTweet(tweet.text)
  return {
    id: tweet.id,
    text: cleanedTweet
  }
}

const getTweetsForLine = async (client, queryString, lastRequestFile) => {
  let { sinceId, numberOfRequests } = await getLastRequestInfo(lastRequestFile)

  numberOfRequests = await checkForTimeout(numberOfRequests)

  const results = await findTweets(client, queryString, sinceId)

  const lastTweet = last(results)
  sinceId = lastTweet.id

  await storeRequestInfo(numberOfRequests, sinceId, lastRequestFile)

  return map((tweet) => getTweetInfo(tweet), results)
}

export default getTweetsForLine
