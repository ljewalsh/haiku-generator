const cleanTweet = (tweet) => {
  let cleanedTweet = tweet
  cleanedTweet = cleanedTweet.replace(/RT\s@\w+:\s/gi, '')
  cleanedTweet = cleanedTweet.replace(/\shttps:\/\/(\w+\.\w+|\w+|$)/gi, '')
  cleanedTweet = cleanedTweet.replace(/\s@\w+($|\w+)/gi, '')
  return cleanedTweet
}

export default cleanTweet
