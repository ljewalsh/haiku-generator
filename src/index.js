import getLine from './haiku/getLine'
import keys from '../twitterKeys.json'
import createTwitterClient from './tweets/createTwitterClient'
import getKeyword from './keywords'

const makeHaiku = async () => {

  const client = await createTwitterClient(keys)
  const keyword = getKeyword()

  try {
    const firstLine = await getLine({ client, keyword, numberOfSyllables: 5 })
    const secondLine = await getLine({ client, keyword, numberOfSyllables: 7 })
    const thirdLine = await getLine({ client, keyword, numberOfSyllables: 5 })

    console.log(firstLine)
    console.log(secondLine)
    console.log(thirdLine)
  }
  catch(err){
    console.log(err)
  }

}

makeHaiku().then()

export {
  getLine
}