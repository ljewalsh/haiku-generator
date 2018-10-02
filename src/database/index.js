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

const findItemById = async (tableName, itemId) => {
  const db = await connectToDb()
  return db.collection(tableName).find({ id: itemId }).next()
}

const findLastItem = async (tableName) => {
  const db = await connectToDb()
  const results = db.collection(tableName).find().limit(1).sort({$natural:-1})
  return results.next()
}

const findItems = async (tableName) => {
  const db = await connectToDb()
  return db.collection(tableName).find().toArray()
}

export {
  saveItem,
  createTable,
  findItemById,
  findLastItem,
  findItems
}