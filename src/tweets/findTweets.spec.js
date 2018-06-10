import test from 'ava'
import keys from '../../twitterKeys.json'
import findTweets from './findTweets'
import createTwitterClient from './createTwitterClient'

test('findTweets returns tweets when given a queryString', async (t) => {
  const queryString = 'node'
  const sinceId = 0
  const client = await createTwitterClient(keys)
  const tweets = await findTweets(client, queryString, sinceId)
  t.truthy(tweets.length > 0)
})