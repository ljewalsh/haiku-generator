const findTweets = async (client, queryString, sinceId) => {

  try {
    const results = await client.get('search/tweets', {
      q: queryString,
      count: 100,
      lang: 'en',
      since_id: sinceId
    })

    return results.statuses
  }
  catch(err){
    throw new Error(err[0].message)
  }
}

export default findTweets