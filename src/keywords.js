const keywords = ['stars', 'galaxy', 'moon', 'astronaut', 'gravity']

const getKeyword = () => {
  const randomIndex = Math.floor((Math.random() * (keywords.length - 1)) + 1)
  return keywords[randomIndex]
}

export {
  keywords
}

export default getKeyword