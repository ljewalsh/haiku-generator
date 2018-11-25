import getTrends from '../tweets/getTrends'
import findTweetForHaiku from './findTweetForHaiku'

const getThirdTweet = async ({ client, query, firstLine }) => {
  let thirdLine = await findTweetForHaiku({ client, numberOfSyllables: 5, query })

  while (thirdLine === firstLine) {
    thirdLine = await findTweetForHaiku({ client, numberOfSyllables: 5, query })
  }

  return thirdLine
}

const createHaiku = async (client) => {
  const trends = await getTrends(client)
  const trend = trends[Math.floor(Math.random()*trends.length)]
  const query = trend.query
  
    const firstLine = await findTweetForHaiku({ client, numberOfSyllables: 5, query })
    const secondLine = await findTweetForHaiku({ client, numberOfSyllables: 7, query })
    const thirdLine = await getThirdTweet({ client, query, firstLine, secondLine })

    return firstLine + '\n' + secondLine + '\n' + thirdLine
}

export default createHaiku
