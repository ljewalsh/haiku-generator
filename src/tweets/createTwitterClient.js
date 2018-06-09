import Twitter from 'twitter'

const createTwitterClient = (keys) => {
  const { consumerKey, consumerSecret, accessTokenKey, accessTokenSecret } = keys
  return new Twitter({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret
  })
}

export default createTwitterClient
