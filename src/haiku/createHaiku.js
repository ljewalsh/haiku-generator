import findLineForHaiku from '../utils/findLineForHaiku'
import keys from '../../twitterKeys.json'
import createTwitterClient from '../tweets/createTwitterClient'
import getKeyword from '../utils/keywords'

const client = createTwitterClient(keys).then()

const createHaiku = async () => {
  const keyword = getKeyword()

  try {
    const firstLine = await findLineForHaiku({ client, keyword, numberOfSyllables: 5 })
    const secondLine = await findLineForHaiku({ client, keyword, numberOfSyllables: 7 })
    let thirdLine = await findLineForHaiku({ client, keyword, numberOfSyllables: 5 })

    while (thirdLine === firstLine){
      thirdLine = await findLineForHaiku({ client, keyword, numberOfSyllables: 5 })
    }

    return [ firstLine, secondLine, thirdLine ]
  } catch (err) {
    throw new Error(err)
  }
}

export default createHaiku
