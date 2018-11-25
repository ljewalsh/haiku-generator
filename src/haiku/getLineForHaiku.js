import findTweetForHaiku from '../tweets/findTweetForHaiku'
import extractSyllables from '../utils/extractSyllables'

const getLineForHaiku = async ({ client, numberOfSyllables, keyword }) => {
  try {
    const tweet = await findTweetForHaiku({ client, keyword, numberOfSyllables })
    const line = extractSyllables({ tweet, numberOfSyllables })
    return line
  } catch (err) {
    if (err.message === 'tweet cannot be turned into haiku') {
      return getLineForHaiku({ client, numberOfSyllables, keyword })
    }
    throw err
  }
}

export default getLineForHaiku
