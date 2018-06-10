import test from 'ava'
import keys from '../../twitterKeys.json'
import createTwitterClient from './createTwitterClient'

test('createTwitterClient creates the twitter class with the correct keys and the request method', async (t) => {
  const client = await createTwitterClient(keys)
  t.is(client.options.consumer_key, keys.consumerKey)
  t.is(client.options.consumer_secret, keys.consumerSecret)
  t.is(client.options.access_token_key, keys.accessTokenKey)
  t.is(client.options.access_token_secret, keys.accessTokenSecret)
  t.truthy(client.request)
})