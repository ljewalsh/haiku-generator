import Twitter from 'twitter'
import { map } from 'ramda'

const createTwitterClient = (keys) => {
  const { consumerKey, consumerSecret, accessTokenKey, accessTokenSecret } = keys
  return new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret
  })
}

const cleanTweet = (tweet) => {
  let cleanedTweet = tweet
  cleanedTweet = cleanedTweet.replace(/RT\s@\w+:\s/gi,"")
  cleanedTweet = cleanedTweet.replace(/\shttps:\/\/.+($|\s)/gi, "")
  cleanedTweet = cleanedTweet.replace(/@\w+\S/gi, "")
  return cleanedTweet
}

const getTweetInfo = (tweet) => {
  const cleanedTweet = cleanTweet(tweet.text)
  return {
    id: tweet.id,
    text: cleanedTweet
  }
}

const getTweets = async (client, queryString, sinceId) => {
  let results

  try {
    results = await client.get('search/tweets', {
      q: queryString,
      count: 100,
      lang: 'en',
      since_id: sinceId
    })
  }
  catch(err){
    throw new Error(err[0].message)
  }

  const tweetInfo = map((tweet) => getTweetInfo(tweet), results.statuses)

  return tweetInfo
}

export {
  createTwitterClient,
  getTweets
}