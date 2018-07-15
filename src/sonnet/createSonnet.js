import getLine from '../utils/getLine'
import keys from '../../twitterKeys.json'
import createTwitterClient from '../tweets/createTwitterClient'
import getKeyword from '../utils/keywords'

const createSonnet = async () => {
  const client = await createTwitterClient(keys)
  const keyword = getKeyword()

  try {
    const firstLine = await getLine({ client, keyword, numberOfSyllables: 10 })
    const secondLine = await getLine({ client, keyword, numberOfSyllables: 10 })
    let thirdLine = await getLine({ client, keyword, numberOfSyllables: 10 })

    return [ firstLine, secondLine, thirdLine ]
  } catch (err) {
    throw new Error(err)
  }
}

export default createSonnet