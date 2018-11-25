import getKeyword from '../utils/keywords'
import findTweetForHaiku from './findTweetForHaiku'

const getThirdTweet = async ({ client, keyword, firstLine }) => {
  let thirdLine = await findTweetForHaiku({ client, numberOfSyllables: 5, keyword })

  while (thirdLine === firstLine) {
    thirdLine = await findTweetForHaiku({ client, numberOfSyllables: 5, keyword })
  }

  return thirdLine
}

const createHaiku = async (client) => {
  const keyword = getKeyword()
  
    const firstLine = await findTweetForHaiku({ client, numberOfSyllables: 5, keyword })
    const secondLine = await findTweetForHaiku({ client, numberOfSyllables: 7, keyword })
    const thirdLine = await getThirdTweet({ client, keyword, firstLine, secondLine })

    return firstLine + '\n' + secondLine + '\n' + thirdLine
}

export default createHaiku
