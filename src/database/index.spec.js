import test from 'ava'

import { createTweetTable, saveTweet, findTweet } from './index'

test('I can connect to the db and insert a tweet', async (t) => {
  const tweet = { id: '12345', tweet: 'Here is a fake tweet'}
  await createTweetTable()
  await saveTweet(tweet)
  const savedTweet = await findTweet('12345')
  t.is(savedTweet.tweet, 'Here is a fake tweet')
})