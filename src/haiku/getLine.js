import { forEach } from 'ramda'
import getTweetsForLine from '../tweets/getTweetsForLine'
import getNumberOfSyllables from './getSyllableCount'

const getLine = async ({ client, keyword, numberOfSyllables }) => {
  try {
    let line = ''
    while (line === '') {
      const tweets = await getTweetsForLine(client, keyword)

      forEach((tweet) => {
        const numOfSyllables = getNumberOfSyllables(tweet.text)
        console.log(numOfSyllables)
        if (numOfSyllables === numberOfSyllables) {
          line = tweet.text
        }
      }, tweets)
    }
    return line
  } catch (err) {
    throw new Error(err.message)
  }
}

export default getLine
