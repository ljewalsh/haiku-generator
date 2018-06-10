import test from 'ava'
import { contains } from 'ramda'
import getKeyword, { keywords } from './keywords'

test('getKeyword finds a random word from the keywords list', (t)=> {
  const keyword = getKeyword()
  t.truthy(keyword)
  t.truthy(contains(keyword, keywords))
})