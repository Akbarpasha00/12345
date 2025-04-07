import { getMongoClient } from "./mongo"
import { ObjectId } from "mongodb"

// Define the database interface
export interface DB {
  candidates: {
    findMany: (query?: any) => Promise<any[]>
    findOne: (query: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (id: string, data: any) => Promise<any>
    delete: (id: string) => Promise<any>
  }
  companies: {
    findMany: (query?: any) => Promise<any[]>
    findOne: (query: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (id: string, data: any) => Promise<any>
    delete: (id: string) => Promise<any>
  }
  offers: {
    findMany: (query?: any) => Promise<any[]>
    findOne: (query: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (id: string, data: any) => Promise<any>
    delete: (id: string) => Promise<any>
  }
  drives: {
    findMany: (query?: any) => Promise<any[]>
    findOne: (query: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (id: string, data: any) => Promise<any>
    delete: (id: string) => Promise<any>
  }
  departments: {
    findMany: (query?: any) => Promise<any[]>
    findOne: (query: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (id: string, data: any) => Promise<any>
    delete: (id: string) => Promise<any>
  }
  events: {
    findMany: (query?: any) => Promise<any[]>
    findOne: (query: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (id: string, data: any) => Promise<any>
    delete: (id: string) => Promise<any>
  }
  scheduledDrives: {
    findMany: (query?: any) => Promise<any[]>
    findOne: (query: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (id: string, data: any) => Promise<any>
    delete: (id: string) => Promise<any>
  }
  swecOffers: {
    findMany: (query?: any) => Promise<any[]>
    findOne: (query: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (id: string, data: any) => Promise<any>
    delete: (id: string) => Promise<any>
  }
  referrals: {
    findMany: (query?: any) => Promise<any[]>
    findOne: (query: any) => Promise<any>
    create: (data: any) => Promise<any>
    update: (id: string, data: any) => Promise<any>
    delete: (id: string) => Promise<any>
  }
}

// Helper functions that are exported as named exports
export async function findOne(collection: string, query: any) {
  try {
    const client = await getMongoClient()
    const db = client.db(process.env.MONGODB_DB)
    return await db.collection(collection).findOne(query)
  } catch (error) {
    console.error(`Error finding document in ${collection}:`, error)
    return null
  }
}

export async function findMany(collection: string, query = {}) {
  try {
    const client = await getMongoClient()
    const db = client.db(process.env.MONGODB_DB)
    return await db.collection(collection).find(query).toArray()
  } catch (error) {
    console.error(`Error finding documents in ${collection}:`, error)
    return []
  }
}

export async function insertOne(collection: string, data: any) {
  try {
    const client = await getMongoClient()
    const db = client.db(process.env.MONGODB_DB)
    const result = await db.collection(collection).insertOne(data)
    return { id: result.insertedId, ...data }
  } catch (error) {
    console.error(`Error creating document in ${collection}:`, error)
    throw error
  }
}

export async function updateOne(collection: string, id: string, data: any) {
  try {
    const client = await getMongoClient()
    const db = client.db(process.env.MONGODB_DB)
    await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: data })
    return { id, ...data }
  } catch (error) {
    console.error(`Error updating document in ${collection}:`, error)
    throw error
  }
}

export async function deleteOne(collection: string, id: string) {
  try {
    const client = await getMongoClient()
    const db = client.db(process.env.MONGODB_DB)
    await db.collection(collection).deleteOne({ _id: new ObjectId(id) })
    return { id }
  } catch (error) {
    console.error(`Error deleting document in ${collection}:`, error)
    throw error
  }
}

export async function findById(collection: string, id: string) {
  try {
    const client = await getMongoClient()
    const db = client.db(process.env.MONGODB_DB)
    return await db.collection(collection).findOne({ _id: new ObjectId(id) })
  } catch (error) {
    console.error(`Error finding document by ID in ${collection}:`, error)
    return null
  }
}

export async function getCandidateById(id: string) {
  return findById("candidates", id)
}

// Export collections helper
export const collections = async () => {
  try {
    const client = await getMongoClient()
    const db = client.db(process.env.MONGODB_DB)
    return {
      candidates: db.collection("candidates"),
      companies: db.collection("companies"),
      offers: db.collection("offers"),
      drives: db.collection("drives"),
      departments: db.collection("departments"),
      events: db.collection("events"),
      scheduledDrives: db.collection("scheduledDrives"),
      swecOffers: db.collection("swecOffers"),
      referrals: db.collection("referrals"),
    }
  } catch (error) {
    console.error("Error getting collections:", error)
    throw error
  }
}

// Create a simple MongoDB implementation
export const db: DB = {
  candidates: {
    findMany: async (query = {}) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("candidates").find(query).toArray()
      } catch (error) {
        console.error("Error finding documents in candidates:", error)
        return []
      }
    },
    findOne: async (query) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("candidates").findOne(query)
      } catch (error) {
        console.error("Error finding document in candidates:", error)
        return null
      }
    },
    create: async (data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        const result = await db.collection("candidates").insertOne(data)
        return { id: result.insertedId, ...data }
      } catch (error) {
        console.error("Error creating document in candidates:", error)
        throw error
      }
    },
    update: async (id, data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("candidates").updateOne({ _id: new ObjectId(id) }, { $set: data })
        return { id, ...data }
      } catch (error) {
        console.error("Error updating document in candidates:", error)
        throw error
      }
    },
    delete: async (id) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("candidates").deleteOne({ _id: new ObjectId(id) })
        return { id }
      } catch (error) {
        console.error("Error deleting document in candidates:", error)
        throw error
      }
    },
  },
  companies: {
    findMany: async (query = {}) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("companies").find(query).toArray()
      } catch (error) {
        console.error("Error finding documents in companies:", error)
        return []
      }
    },
    findOne: async (query) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("companies").findOne(query)
      } catch (error) {
        console.error("Error finding document in companies:", error)
        return null
      }
    },
    create: async (data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        const result = await db.collection("companies").insertOne(data)
        return { id: result.insertedId, ...data }
      } catch (error) {
        console.error("Error creating document in companies:", error)
        throw error
      }
    },
    update: async (id, data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("companies").updateOne({ _id: new ObjectId(id) }, { $set: data })
        return { id, ...data }
      } catch (error) {
        console.error("Error updating document in companies:", error)
        throw error
      }
    },
    delete: async (id) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("companies").deleteOne({ _id: new ObjectId(id) })
        return { id }
      } catch (error) {
        console.error("Error deleting document in companies:", error)
        throw error
      }
    },
  },
  offers: {
    findMany: async (query = {}) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("offers").find(query).toArray()
      } catch (error) {
        console.error("Error finding documents in offers:", error)
        return []
      }
    },
    findOne: async (query) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("offers").findOne(query)
      } catch (error) {
        console.error("Error finding document in offers:", error)
        return null
      }
    },
    create: async (data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        const result = await db.collection("offers").insertOne(data)
        return { id: result.insertedId, ...data }
      } catch (error) {
        console.error("Error creating document in offers:", error)
        throw error
      }
    },
    update: async (id, data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("offers").updateOne({ _id: new ObjectId(id) }, { $set: data })
        return { id, ...data }
      } catch (error) {
        console.error("Error updating document in offers:", error)
        throw error
      }
    },
    delete: async (id) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("offers").deleteOne({ _id: new ObjectId(id) })
        return { id }
      } catch (error) {
        console.error("Error deleting document in offers:", error)
        throw error
      }
    },
  },
  drives: {
    findMany: async (query = {}) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("drives").find(query).toArray()
      } catch (error) {
        console.error("Error finding documents in drives:", error)
        return []
      }
    },
    findOne: async (query) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("drives").findOne(query)
      } catch (error) {
        console.error("Error finding document in drives:", error)
        return null
      }
    },
    create: async (data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        const result = await db.collection("drives").insertOne(data)
        return { id: result.insertedId, ...data }
      } catch (error) {
        console.error("Error creating document in drives:", error)
        throw error
      }
    },
    update: async (id, data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("drives").updateOne({ _id: new ObjectId(id) }, { $set: data })
        return { id, ...data }
      } catch (error) {
        console.error("Error updating document in drives:", error)
        throw error
      }
    },
    delete: async (id) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("drives").deleteOne({ _id: new ObjectId(id) })
        return { id }
      } catch (error) {
        console.error("Error deleting document in drives:", error)
        throw error
      }
    },
  },
  departments: {
    findMany: async (query = {}) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("departments").find(query).toArray()
      } catch (error) {
        console.error("Error finding documents in departments:", error)
        return []
      }
    },
    findOne: async (query) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("departments").findOne(query)
      } catch (error) {
        console.error("Error finding document in departments:", error)
        return null
      }
    },
    create: async (data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        const result = await db.collection("departments").insertOne(data)
        return { id: result.insertedId, ...data }
      } catch (error) {
        console.error("Error creating document in departments:", error)
        throw error
      }
    },
    update: async (id, data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("departments").updateOne({ _id: new ObjectId(id) }, { $set: data })
        return { id, ...data }
      } catch (error) {
        console.error("Error updating document in departments:", error)
        throw error
      }
    },
    delete: async (id) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("departments").deleteOne({ _id: new ObjectId(id) })
        return { id }
      } catch (error) {
        console.error("Error deleting document in departments:", error)
        throw error
      }
    },
  },
  events: {
    findMany: async (query = {}) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("events").find(query).toArray()
      } catch (error) {
        console.error("Error finding documents in events:", error)
        return []
      }
    },
    findOne: async (query) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("events").findOne(query)
      } catch (error) {
        console.error("Error finding document in events:", error)
        return null
      }
    },
    create: async (data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        const result = await db.collection("events").insertOne(data)
        return { id: result.insertedId, ...data }
      } catch (error) {
        console.error("Error creating document in events:", error)
        throw error
      }
    },
    update: async (id, data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("events").updateOne({ _id: new ObjectId(id) }, { $set: data })
        return { id, ...data }
      } catch (error) {
        console.error("Error updating document in events:", error)
        throw error
      }
    },
    delete: async (id) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("events").deleteOne({ _id: new ObjectId(id) })
        return { id }
      } catch (error) {
        console.error("Error deleting document in events:", error)
        throw error
      }
    },
  },
  scheduledDrives: {
    findMany: async (query = {}) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("scheduledDrives").find(query).toArray()
      } catch (error) {
        console.error("Error finding documents in scheduledDrives:", error)
        return []
      }
    },
    findOne: async (query) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("scheduledDrives").findOne(query)
      } catch (error) {
        console.error("Error finding document in scheduledDrives:", error)
        return null
      }
    },
    create: async (data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        const result = await db.collection("scheduledDrives").insertOne(data)
        return { id: result.insertedId, ...data }
      } catch (error) {
        console.error("Error creating document in scheduledDrives:", error)
        throw error
      }
    },
    update: async (id, data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("scheduledDrives").updateOne({ _id: new ObjectId(id) }, { $set: data })
        return { id, ...data }
      } catch (error) {
        console.error("Error updating document in scheduledDrives:", error)
        throw error
      }
    },
    delete: async (id) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("scheduledDrives").deleteOne({ _id: new ObjectId(id) })
        return { id }
      } catch (error) {
        console.error("Error deleting document in scheduledDrives:", error)
        throw error
      }
    },
  },
  swecOffers: {
    findMany: async (query = {}) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("swecOffers").find(query).toArray()
      } catch (error) {
        console.error("Error finding documents in swecOffers:", error)
        return []
      }
    },
    findOne: async (query) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("swecOffers").findOne(query)
      } catch (error) {
        console.error("Error finding document in swecOffers:", error)
        return null
      }
    },
    create: async (data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        const result = await db.collection("swecOffers").insertOne(data)
        return { id: result.insertedId, ...data }
      } catch (error) {
        console.error("Error creating document in swecOffers:", error)
        throw error
      }
    },
    update: async (id, data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("swecOffers").updateOne({ _id: new ObjectId(id) }, { $set: data })
        return { id, ...data }
      } catch (error) {
        console.error("Error updating document in swecOffers:", error)
        throw error
      }
    },
    delete: async (id) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("swecOffers").deleteOne({ _id: new ObjectId(id) })
        return { id }
      } catch (error) {
        console.error("Error deleting document in swecOffers:", error)
        throw error
      }
    },
  },
  referrals: {
    findMany: async (query = {}) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("referrals").find(query).toArray()
      } catch (error) {
        console.error("Error finding documents in referrals:", error)
        return []
      }
    },
    findOne: async (query) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        return await db.collection("referrals").findOne(query)
      } catch (error) {
        console.error("Error finding document in referrals:", error)
        return null
      }
    },
    create: async (data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        const result = await db.collection("referrals").insertOne(data)
        return { id: result.insertedId, ...data }
      } catch (error) {
        console.error("Error creating document in referrals:", error)
        throw error
      }
    },
    update: async (id, data) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("referrals").updateOne({ _id: new ObjectId(id) }, { $set: data })
        return { id, ...data }
      } catch (error) {
        console.error("Error updating document in referrals:", error)
        throw error
      }
    },
    delete: async (id) => {
      try {
        const client = await getMongoClient()
        const db = client.db(process.env.MONGODB_DB)
        await db.collection("referrals").deleteOne({ _id: new ObjectId(id) })
        return { id }
      } catch (error) {
        console.error("Error deleting document in referrals:", error)
        throw error
      }
    },
  },
}

export default db

