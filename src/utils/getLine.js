import Promise from 'bluebird'
import getTweetsForLine from '../tweets/getTweetsForLine'
import getNumberOfSyllables from './getSyllableCount'
import saveTweet from './saveTweet'

const getLine = async ({ client, keyword, numberOfSyllables, lastLine }) => {
  try {
    let line = ''
    while (line === '' && line !== lastLine ) {
      const tweets = await getTweetsForLine(client, keyword)

      await Promise.each(tweets, (tweet) => {
        saveTweet(tweet.id, tweet.text)
        const numberOfSyllablesInTweet = getNumberOfSyllables(tweet.text)
        if (numberOfSyllablesInTweet === numberOfSyllables) {
          const words = tweet.text.split(' ')
          line = words.slice(0, numberOfSyllables).join()
        }
      })
    }
    return line
  } catch (err) {
    throw new Error(err.message)
  }
}

export default getLine
