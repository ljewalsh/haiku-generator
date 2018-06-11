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
