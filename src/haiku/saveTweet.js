import { readFileSync, writeFileSync } from 'fs'
const PREVIOUS_TWEETS_FILE = './previousTweets.json'

const saveTweet = (id, tweet, syllableCount) => {
  const previousTweetsFile = JSON.parse(readFileSync(PREVIOUS_TWEETS_FILE, 'utf8'))
  const previousTweets = previousTweetsFile.previousTweets
  previousTweets.push({ id, tweet, syllableCount })
  return writeFileSync(PREVIOUS_TWEETS_FILE, JSON.stringify({
    previousTweets
  }), 'utf8')
}

export default saveTweet