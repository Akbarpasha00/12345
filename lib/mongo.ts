import { MongoClient, type Db, type Collection } from "mongodb"

// Ensure the connection string starts with mongodb:// or mongodb+srv://
const uri = process.env.DATABASE_URL || "mongodb://localhost:27017"
const dbName = process.env.MONGODB_DB || "cms"

let client: MongoClient | null = null
let db: Db | null = null

// Validate MongoDB connection string
function validateMongoUri(uri: string): string {
  if (!uri) {
    console.error("DATABASE_URL is not defined")
    return "mongodb://localhost:27017"
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    console.error("Invalid MongoDB connection string. Must start with mongodb:// or mongodb+srv://")
    return "mongodb://localhost:27017"
  }

  return uri
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!client) {
    const validUri = validateMongoUri(uri)
    client = new MongoClient(validUri)
    await client.connect()
  }
  return client
}

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db
  }

  const client = await getMongoClient()
  db = client.db(dbName)
  return db
}

export async function getCollection(collectionName: string): Promise<Collection> {
  const db = await connectToDatabase()
  return db.collection(collectionName)
}

export async function disconnectFromDatabase() {
  if (client) {
    await client.close()
    client = null
    db = null
  }
}

// Handle graceful shutdown
if (process.env.NODE_ENV !== "development") {
  process.on("SIGINT", async () => {
    await disconnectFromDatabase()
    process.exit(0)
  })

  process.on("SIGTERM", async () => {
    await disconnectFromDatabase()
    process.exit(0)
  })
}

