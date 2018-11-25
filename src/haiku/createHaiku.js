import getLineForHaiku from './getLineForHaiku'
import extractSyllables from '../utils/extractSyllables'
import getTrends from '../tweets/getTrends'

const getThirdLine = async ({ client, keyword, firstLine }) => {
  let thirdLine = await getLineForHaiku({ client, numberOfSyllables: 5, keyword })

  const secondLineAsThirdLine = extractSyllables({ tweet: firstLine, numberOfSyllables: 5 })
  while (thirdLine === firstLine || thirdLine === secondLineAsThirdLine) {
    thirdLine = await getLineForHaiku({ client, numberOfSyllables: 5, keyword })
  }

  return thirdLine
}

const createHaiku = async (client) => {
  const trends = await getTrends(client)
  const trend = trends[0]
  const keyword = trend.query

  try {
    const firstLine = await getLineForHaiku({ client, numberOfSyllables: 5, keyword })
    const secondLine = await getLineForHaiku({ client, numberOfSyllables: 7, keyword })
    const thirdLine = await getThirdLine({ client, keyword, firstLine, secondLine })

    return firstLine + '\n' + secondLine + '\n' + thirdLine
  } catch (err) {
    if (err.message === 'tweet cannot be turned into haiku') {
      return createHaiku(client)
    }
    throw new Error(err)
  }
}

export default createHaiku
