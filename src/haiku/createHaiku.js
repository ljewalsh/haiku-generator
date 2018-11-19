import getKeyword from '../utils/keywords'
import getLineForHaiku from './getLineForHaiku'

const getThirdLine = async ({ client, keyword, secondLine }) => {
  let thirdLine = await getLineForHaiku({client, numberOfSyllables: 5, keyword})

  while (thirdLine === secondLine) {
    thirdLine = await getLineForHaiku({client, numberOfSyllables: 5, keyword})
  }

  return thirdLine
}

const createHaiku = async (client) => {
  const keyword = getKeyword()

  try {
    const firstLine = await getLineForHaiku({ client, numberOfSyllables: 5, keyword })
    const secondLine = await getLineForHaiku({ client, numberOfSyllables: 7, keyword })
    const thirdLine = await getThirdLine({ client, keyword, secondLine })

    return [ firstLine, secondLine, thirdLine ]
  } catch (err) {
    if (err.message === 'tweet cannot be turned into haiku'){
      return createHaiku(client)
    }
    throw new Error(err)
  }
}

export default createHaiku
