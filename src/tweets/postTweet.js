const postTweet = ({ client, tweet }) => {
  return client.post('statuses/update', {status: tweet})
}

export default postTweet