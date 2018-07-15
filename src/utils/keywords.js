const keywords = ['moon', 'star', 'galaxy', 'stars', 'gravity', 'comet', 'rocket', 'supernova', 'aliens', 'solar system']

const getKeyword = () => {
  const randomIndex = Math.floor((Math.random() * (keywords.length - 1)) + 1)
  return keywords[randomIndex]
}

export {
  keywords
}

export default getKeyword
