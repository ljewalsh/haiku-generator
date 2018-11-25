import { last, map } from 'ramda'
import sleep from 'sleep'
import getLastRequestInfo from '../utils/lastRequest/getLastRequestInfo'
import findTweets from './findTweets'
import storeRequestInfo from '../utils/lastRequest/storeRequestInfo'
import cleanTweet from './cleanTweet'

const checkForTimeout = async (numberOfRequests) => {
  if (numberOfRequests === 180) {
    console.log('waiting request timeout')
    await sleep.sleep(10)
    console.log('waited request timeout')
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

const handleTweetRequest = async (client, queryString) => {
  try {
    let { numberOfRequests, sinceId } = await getLastRequestInfo('requests')

    numberOfRequests = await checkForTimeout(numberOfRequests)

    const results = await findTweets(client, queryString, sinceId)

    const lastTweet = last(results)
    sinceId = lastTweet.id
    numberOfRequests += 1

    await storeRequestInfo('requests', numberOfRequests, sinceId)

    return map((tweet) => getTweetInfo(tweet), results)
  } catch (err) {
    if (err.code !== 'ECONNRESET' && err.name !== 'MongoNetworkError') {
      throw err
    }
    return []
  }
}

export default handleTweetRequest
