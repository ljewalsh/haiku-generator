import { forEach, last } from 'ramda'
import moment from 'moment'
import createTwitterClient from './tweets/createTwitterClient'
import getTweetsForLine from './tweets/getTweetsForLine'
import keys from '../twitterKeys.json'
import getKeyword from './keywords'
import getNumberOfSyllables from './syllables'
import { writeFile, readFileSync } from 'fs'

const requestInfo = './lastRequestInfo.json'

const waitRequesTimeout = (client, keyword, numberOfSyllables, numberOfRequests) => {
  console.log('waiting request timeout')
  numberOfRequests = 0
  return setTimeout(()=> getLine(client, keyword, numberOfSyllables), 900)
}

const getLine = async ({ client, keyword, numberOfSyllables, numberOfRequests, timestamp, sinceId }) => {
  try {
    let line = ''
    while (line === '') {
      const fifteenMinutesAgo = moment().subtract(15, 'minute').utc()
      const lastRequestDateTime = moment(timestamp).utc()
      if (numberOfRequests === 180 && lastRequestDateTime < fifteenMinutesAgo) {
        await waitRequesTimeout(client, keyword, numberOfSyllables)
      }

      const tweets = await getTweetsForLine(client, keyword, sinceId)

      const lastTweet = last(tweets)
      sinceId = lastTweet.id
      numberOfRequests += 1

      forEach((tweet) => {
        const numOfSyllables = getNumberOfSyllables(tweet.text)
        if (numOfSyllables === numberOfSyllables) {
          line = tweet.text
        }
      }, tweets)
    }
    return line
  }
  catch(err){
    throw new Error(err.message)
  }
}


const makeHaiku = async () => {

  const { timestamp, sinceId, numberOfRequests } = await JSON.parse(readFileSync(requestInfo, 'utf8'))

  const client = await createTwitterClient(keys)
  const keyword = getKeyword()

  try {
    const firstLine = await getLine({ client, keyword, timestamp, sinceId, numberOfRequests, numberOfSyllables: 5 })
    const secondLine = await getLine({ client, keyword, timestamp, sinceId, numberOfRequests, numberOfSyllables: 7 })
    const thirdLine = await getLine({ client, keyword, timestamp, sinceId, numberOfRequests, numberOfSyllables: 5 })

    console.log(firstLine)
    console.log(secondLine)
    console.log(thirdLine)
  }
  catch(err){
    console.log(err)
  }

  return writeFile('./lastRequestInfo.json', JSON.stringify({
    numberOfRequests,
    sinceId,
    timestamp: new Date()
  }), 'utf8')
}

makeHaiku().then()