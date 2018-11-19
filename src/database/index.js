import { promisify } from 'bluebird'
import { MongoClient } from 'mongodb'

const url = "mongodb://localhost:27017/"

const mongo = promisify(MongoClient)

const connectToDb = async () => {
  const client = await mongo.connect(url)
  return { client, db: client.db("mydb")}
}

const createTable = async (tableName) => {
  const { client, db } = await connectToDb()
  await db.createCollection(tableName)
  await client.close()
}

const saveItem = async (tableName, item) => {
  const { client, db } = await connectToDb()
  await db.collection(tableName).insertOne(item)
  await client.close()
}

const findItemById = async (tableName, itemId) => {
  const { client, db } = await connectToDb()
  const collection = db.collection(tableName).find({ id: itemId }).next()
  await client.close()
  return collection
}

const findLastItem = async (tableName) => {
  const { client, db } = await connectToDb()
  const results = db.collection(tableName).find().limit(1).sort({$natural:-1})
  const result = results.next()
  client.close()
  return result
}

const findItems = async (tableName) => {
  const { client, db } = await connectToDb()
  const items = db.collection(tableName).find().toArray()
  client.close()
  return items
}

export {
  saveItem,
  createTable,
  findItemById,
  findLastItem,
  findItems
}