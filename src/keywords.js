const keywords = ['winter', 'spring', 'rose', 'snow', 'blossoms', 'cherry']

const getKeyword = () => {
  const randomIndex = Math.floor((Math.random() * (keywords.length - 1)) + 1)
  return keywords[randomIndex]
}

export {
  keywords
}

export default getKeyword
