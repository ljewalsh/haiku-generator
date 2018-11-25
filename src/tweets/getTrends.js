const getTrends = async (client) => {
  const results = await client.get('trends/place', { id: '23424916' })
  return results[0].trends
}

export default getTrends
