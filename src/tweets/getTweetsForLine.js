import { map } from 'ramda'

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

const findTweets = async (client, queryString, sinceId) => {
  try {
    const results = await client.get('search/tweets', {
      q: queryString,
      count: 100,
      lang: 'en',
      since_id: sinceId
    })
    console.log(results)

    return results.statuses
  }
  catch(err){
    throw new Error(err[0].message)
  }
}

const getTweetsForLine = async (client, queryString, sinceId) => {
  const tweets = await findTweets(client, queryString, sinceId)
  return map((tweet) => getTweetInfo(tweet), tweets)
}

export {
  findTweets,
  cleanTweet,
  getTweetInfo
}

export default getTweetsForLine