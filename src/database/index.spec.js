import test from 'ava'

import { createTable, saveItem, findItem } from './index'

test('I can connect to the db and insert a tweet', async (t) => {
  const tweet = { id: '12345', tweet: 'Here is a fake tweet'}
  await createTable('tweets')
  await saveItem('tweets', tweet)
  const savedTweet = await findItem('tweets','12345')
  t.is(savedTweet.tweet, 'Here is a fake tweet')
})