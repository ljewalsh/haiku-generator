import { forEach } from 'ramda'
import syllable from 'syllable'

const getSyllables = (tweet) => {
  let numberOfSyllables = 0
  const words = tweet.split(" ")
  forEach((word) => {
    numberOfSyllables += syllable(word)
  }, words)
  return numberOfSyllables
}

export default getSyllables