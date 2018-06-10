import { map } from 'ramda'
import { writeFile } from 'fs'
import sleep from 'sleep'
import checkTimestamp from '../lastRequest/checkTimestamp'
import { getLastRequestInfo } from '../lastRequest'
import findTweets from './findTweets'

const cleanTweet = (tweet) => {
  let cleanedTweet = tweet
  cleanedTweet = cleanedTweet.replace(/RT\s@\w+:\s/gi,"")
  cleanedTweet = cleanedTweet.replace(/\shttps:\/\/(\w+\.\w+|\w+|$)/gi, "")
  cleanedTweet = cleanedTweet.replace(/\s@\w+($|\w+)/gi, "")
  return cleanedTweet
}

const getTweetInfo = (tweet) => {
  const cleanedTweet = cleanTweet(tweet.text)
  return {
    id: tweet.id,
    text: cleanedTweet
  }
}

const getTweetsForLine = async (client, queryString) => {
  let { timestamp, sinceId, numberOfRequests } = await getLastRequestInfo()
  numberOfRequests = checkTimestamp(numberOfRequests, timestamp)
  if (numberOfRequests === 180) {
    console.log('waiting request timeout')
    sleep.sleep(900)
  }

  const tweetData = await findTweets(client, queryString, sinceId)
  const tweets = map((tweet) => getTweetInfo(tweet), tweetData)
  return { tweets, numberOfRequests }
}

export {
  cleanTweet,
  getTweetInfo
}

export default getTweetsForLine