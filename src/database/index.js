import { promisify } from 'bluebird'
import { MongoClient } from 'mongodb'

const url = "mongodb://localhost:27017/"

const mongo = promisify(MongoClient)

const connectToDb = async () => {
  const client = await mongo.connect(url)
  return client.db("mydb")
}

const createTable = async (tableName) => {
  const db = await connectToDb()
  await db.createCollection(tableName)
}

const saveItem = async (tableName, item) => {
  const db = await connectToDb()
  await db.collection(tableName).insertOne(item)
}

const findItem = async (tableName, itemId) => {
  const db = await connectToDb()
  return db.collection(tableName).findOne({ id: itemId })
}

export {
  saveItem,
  createTable,
  findItem
}