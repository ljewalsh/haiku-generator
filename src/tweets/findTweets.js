const findTweets = async (client, queryString, sinceId) => {
  console.log('Searching for tweets...')
    const results = await client.get('search/tweets', {
      q: queryString,
      count: 100,
      lang: 'en',
      since_id: sinceId
    })
    return results.statuses
}

export default findTweets
