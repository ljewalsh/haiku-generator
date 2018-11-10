const getFirstSentence = (tweet) => {
  const match = tweet.match(/^([^.]+)/)
  if (match){
    return match[0]
  }
  return tweet
}

export default getFirstSentence