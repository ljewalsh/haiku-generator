import { promisify } from 'bluebird'
import { MongoClient } from 'mongodb'

const url = "mongodb://localhost:27017/"

const mongo = promisify(MongoClient)

const createTweetTable = async () => {
  const client = await mongo.connect(url)
  const db = client.db("mydb")
  await db.createCollection('tweets')
  client.close()
}

const saveTweet = async (tweet) => {
  const client = await mongo.connect(url)
  const db = client.db("mydb")
  await db.collection('tweets').insertOne(tweet)
  client.close()
}

const findTweet = async (tweetId) => {
  const client = await mongo.connect(url)
  const db = client.db("mydb")
  return db.collection('tweets').findOne({ id: tweetId })
}

export {
  saveTweet,
  createTweetTable,
  findTweet
}