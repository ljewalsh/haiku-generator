const getTrends = async (client) => {
  const res = await client.get('trends/place', { id: '23424977'})
  return res[0].trends
}

export default getTrends