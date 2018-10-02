import { last, map } from 'ramda'
import sleep from 'sleep'
import getLastRequestInfo from '../utils/lastRequest/getLastRequestInfo'
import findTweets from './findTweets'
import storeRequestInfo from '../utils/lastRequest/storeRequestInfo'
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

const getTweetsForLine = async (client, queryString) => {
  let { sinceId, numberOfRequests } = await getLastRequestInfo('requests')

  numberOfRequests = await checkForTimeout(numberOfRequests)

  const results = await findTweets(client, queryString, sinceId)

  const lastTweet = last(results)
  sinceId = lastTweet.id
  numberOfRequests += 1

  await storeRequestInfo('requests', numberOfRequests, sinceId)

  return map((tweet) => getTweetInfo(tweet), results)
}

export default getTweetsForLine
