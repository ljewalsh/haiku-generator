import { CronJob } from 'cron'
import createHaiku from './haiku/createHaiku'

const job = new CronJob({
  cronTime: '7-59/15 * * * *',
  onTick: () => {
    return createHaiku().then(console.log)
  },
      start: false
})

job.start()

