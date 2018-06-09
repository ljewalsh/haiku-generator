import test from 'ava'
import { readFileSync } from 'fs'
import { cleanTweet, getTweetInfo } from './getTweetsForLine'

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

test('getTweetInfo returns the id and the cleaned text of each tweet', (t) => {
  const testTweets = [{
    id: '1005340141420937200',
    text: '@AdriMakesArt The closest thing to that, in my experience, are artist discord servers. That\'s the only place where… https://t.co/ia1UqNwqff',
    fake: 'nope'
  }, {
    id: '803342710006566900',
    text: 'RT @UberFacts: During the Apollo 11 mission, which landed the first two humans on the moon, the average age in the NASA control room was ju…',
    fake: 'nope'
  }]

  const firstTweet = testTweets[0]
  const secondTweet = testTweets[1]

  const firstTweetInfo = getTweetInfo(firstTweet)
  const secondTweetInfo = getTweetInfo(secondTweet)

  t.is(firstTweetInfo.id, firstTweet.id)
  t.is(firstTweetInfo.text, cleanTweet(firstTweet.text))
  t.falsy(firstTweetInfo.fake)

  t.is(secondTweetInfo.id, secondTweet.id)
  t.is(secondTweetInfo.text, cleanTweet(secondTweet.text))
  t.falsy(secondTweetInfo.fake)
})