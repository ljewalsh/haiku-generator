import { CronJob } from 'cron'
import createHaiku from './haiku/createHaiku'
import { createTable, saveItem } from './database'
import keys from '../twitterKeys.json'
import createTwitterClient from './tweets/createTwitterClient'

const twitterClient = createTwitterClient(keys)

const runGenerator = async () => {
  const haiku = await createHaiku(twitterClient)
  await saveItem('haikus', haiku)
  console.log(haiku)
}

const job = new CronJob({
  cronTime: '7-59/15 * * * *',
  onTick: () => {
    return runGenerator()
  },
      start: false
})

createTable('haikus').then(
  createTable('tweets').then(
    runGenerator().then(
      job.start()
    )
  )
)

