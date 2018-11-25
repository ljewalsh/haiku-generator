import test from 'ava'
import cleanTweet from './cleanTweet'

test('cleanTweet removes any retweet strings from a tweet', (t) => {
  const tweet = 'RT @QueenMicheIIe: Got my moon lamp in the mail today so I had to do a photoshoot ✨'
  const cleanedTweet = cleanTweet(tweet)
  const expectedTweet = 'Got my moon lamp in the mail today so I had to do a photoshoot ✨'
  t.is(cleanedTweet, expectedTweet)
})

test('cleanTweet removes any mentions from a tweet (whether in the middle or end of a tweet)', (t) => {
  const tweet = 'Got my moon lamp in the mail today @pauatientha so I had to do a photoshoot ✨ @ljewalsh'
  const cleanedTweet = cleanTweet(tweet)
  const expectedTweet = 'Got my moon lamp in the mail today so I had to do a photoshoot ✨'
  t.is(cleanedTweet, expectedTweet)
})

test('cleanTweet removes any urls from a tweet (whether in the middle or end of the tweet)', (t) => {
  const tweet = 'Got my moon lamp https://moonlamp in the mail today so I had to do a photoshoot ✨ https://cool.com'
  const cleanedTweet = cleanTweet(tweet)
  const expectedTweet = 'Got my moon lamp in the mail today so I had to do a photoshoot ✨'
  t.is(cleanedTweet, expectedTweet)
})

test('cleanTweet removes weird endings from tweets', (t) => {
  const tweet = 'If I ever meet someone and they tell me they\'re from somewhere like Montana or South Dakota I\'m just gonna assume t…/0G9iltf3rP'
  const cleanedTweet = cleanTweet(tweet)
  const expectedTweet = 'If I ever meet someone and they tell me they\'re from somewhere like Montana or South Dakota I\'m just gonna assume t…'
  t.is(cleanedTweet, expectedTweet)
})

test('cleanTweet removes newline characters from tweet', (t) => {
  const tweet = 'Hey Human. . .\n we trapped'
  const cleanedTweet = cleanTweet(tweet)
  const expectedTweet = 'Hey Human. . .we trapped'
  t.is(cleanedTweet, expectedTweet)
})

test('cleanTweet removes extra white spaces from tweet', (t) => {
  const tweet = 'Hey Human. . .         we trapped'
  const cleanedTweet = cleanTweet(tweet)
  const expectedTweet = 'Hey Human. . .we trapped'
  t.is(cleanedTweet, expectedTweet)
})

test('cleanTweet removes hashtags from tweet', (t) => {
  const tweet = '#Baahubali director'
  const cleanedTweet = cleanTweet(tweet)
  const expectedTweet = 'director'
  t.is(cleanedTweet, expectedTweet)
})
