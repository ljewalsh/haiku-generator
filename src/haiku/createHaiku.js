import getLine from './getLine'
import keys from '../../twitterKeys.json'
import createTwitterClient from '../tweets/createTwitterClient'
import getKeyword from '../keywords'

const createHaiku = async () => {
  const client = await createTwitterClient(keys)
  const keyword = getKeyword()

  try {
    const firstLine = await getLine({ client, keyword, numberOfSyllables: 5 })
    const secondLine = await getLine({ client, keyword, numberOfSyllables: 7 })
    const thirdLine = await getLine({ client, keyword, numberOfSyllables: 5 })

    return [ firstLine, secondLine, thirdLine ]
  } catch (err) {
    throw new Error(err)
  }
}

export default createHaiku
