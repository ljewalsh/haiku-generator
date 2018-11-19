import getSyllableCount from './getSyllableCount'

const extractSyllables = ({ tweet, numberOfSyllables }) => {
  let extractedWords = ''
  let syllablesInExtractedWords = 0
  let wordIndex = 0
  const words = tweet.split(' ')
  while (syllablesInExtractedWords < numberOfSyllables) {
    const word = words[wordIndex]
      const syllableCount = getSyllableCount(word)
      const newSyllableCount = syllablesInExtractedWords + syllableCount
      if (newSyllableCount <= numberOfSyllables) {
        extractedWords = extractedWords + word + ' '
        syllablesInExtractedWords += syllableCount
        wordIndex +=1
      }
      else if (newSyllableCount > numberOfSyllables){
        throw new Error('tweet cannot be turned into haiku')
      }
  }
  return extractedWords.trim()

}

export default extractSyllables