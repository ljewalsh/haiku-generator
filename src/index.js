import createHaiku from './haiku/createHaiku'
import { createTable, saveItem } from './database'
import keys from '../twitterKeys.json'
import createTwitterClient from './tweets/createTwitterClient'
import postTweet from './tweets/postTweet'

const twitterClient = createTwitterClient(keys)

const runGenerator = async () => {
  const run = true
  while (run) {
    await createTable('haikus')
    await createTable('tweets')
    await createTable('requests')
    const haiku = await createHaiku(twitterClient)
    await saveItem('haikus', { text: haiku })
    console.log(haiku)
    await postTweet({ client: twitterClient, tweet: haiku })
  }
}

runGenerator().then()
