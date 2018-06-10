import getLine from './haiku/getLine'
import keys from '../twitterKeys.json'
import createTwitterClient from './tweets/createTwitterClient'
import getKeyword from './keywords'
import { getLastRequestInfo } from './lastRequest'

const makeHaiku = async () => {

  const { timestamp, sinceId, numberOfRequests } = await getLastRequestInfo()

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

}

makeHaiku().then()

export {
  getLine
}