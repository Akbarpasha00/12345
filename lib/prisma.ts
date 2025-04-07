// This is a stub file to satisfy imports from files not yet updated
// It redirects all Prisma operations to our MongoDB utility functions

import { collections, findMany, findOne, insertOne, updateOne, deleteOne, findById } from "./db"

// Create a mock PrismaClient that redirects to MongoDB
const prisma = {
  user: {
    findUnique: async (args: any) => {
      if (args.where?.email) {
        return await findOne(collections.USERS, { email: args.where.email })
      }
      if (args.where?.id) {
        return await findOne(collections.USERS, { _id: args.where.id })
      }
      return null
    },
    findFirst: async (args: any) => {
      return await findOne(collections.USERS, args.where || {})
    },
    findMany: async (args: any) => {
      return await findMany(collections.USERS, args.where || {})
    },
    create: async (args: any) => {
      return await insertOne(collections.USERS, args.data)
    },
    update: async (args: any) => {
      if (args.where?.id) {
        return await updateOne(collections.USERS, args.where.id, args.data)
      }
      return null
    },
    delete: async (args: any) => {
      if (args.where?.id) {
        return await deleteOne(collections.USERS, args.where.id)
      }
      return null
    },
  },
  candidate: {
    findUnique: async (args: any) => {
      if (args.where?.id) {
        return await findOne(collections.CANDIDATES, { _id: args.where.id })
      }
      return null
    },
    findMany: async (args: any) => {
      return await findMany(collections.CANDIDATES, args.where || {})
    },
    create: async (args: any) => {
      return await insertOne(collections.CANDIDATES, args.data)
    },
    update: async (args: any) => {
      if (args.where?.id) {
        return await updateOne(collections.CANDIDATES, args.where.id, args.data)
      }
      return null
    },
    delete: async (args: any) => {
      if (args.where?.id) {
        return await deleteOne(collections.CANDIDATES, args.where.id)
      }
      return null
    },
  },
  company: {
    findUnique: async (args: any) => {
      if (args.where?.id) {
        return await findOne(collections.COMPANIES, { _id: args.where.id })
      }
      return null
    },
    findMany: async (args: any) => {
      return await findMany(collections.COMPANIES, args.where || {})
    },
    create: async (args: any) => {
      return await insertOne(collections.COMPANIES, args.data)
    },
    update: async (args: any) => {
      if (args.where?.id) {
        return await updateOne(collections.COMPANIES, args.where.id, args.data)
      }
      return null
    },
    delete: async (args: any) => {
      if (args.where?.id) {
        return await deleteOne(collections.COMPANIES, args.where.id)
      }
      return null
    },
  },
  offer: {
    findMany: async () => {
      return await findMany(collections.OFFERS, {}, { sort: { createdAt: -1 } })
    },
    findUnique: async ({ where }: { where: any }) => {
      if (where.id) {
        return await findById(collections.OFFERS, where.id)
      }
      return null
    },
    create: async ({ data }: { data: any }) => {
      return await insertOne(collections.OFFERS, {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    },
    update: async ({ where, data }: { where: any; data: any }) => {
      if (where.id) {
        return await updateOne(collections.OFFERS, where.id, {
          ...data,
          updatedAt: new Date(),
        })
      }
      return null
    },
    delete: async ({ where }: { where: any }) => {
      if (where.id) {
        return await deleteOne(collections.OFFERS, where.id)
      }
      return null
    },
  },
  drive: {
    findMany: async () => {
      return await findMany(collections.DRIVES, {}, { sort: { createdAt: -1 } })
    },
    findUnique: async ({ where }: { where: any }) => {
      if (where.id) {
        return await findById(collections.DRIVES, where.id)
      }
      return null
    },
    create: async ({ data }: { data: any }) => {
      return await insertOne(collections.DRIVES, {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    },
    update: async ({ where, data }: { where: any; data: any }) => {
      if (where.id) {
        return await updateOne(collections.DRIVES, where.id, {
          ...data,
          updatedAt: new Date(),
        })
      }
      return null
    },
    delete: async ({ where }: { where: any }) => {
      if (where.id) {
        return await deleteOne(collections.DRIVES, where.id)
      }
      return null
    },
  },
  department: {
    findMany: async () => {
      return await findMany(collections.DEPARTMENTS, {}, { sort: { createdAt: -1 } })
    },
    findUnique: async ({ where }: { where: any }) => {
      if (where.id) {
        return await findById(collections.DEPARTMENTS, where.id)
      }
      return null
    },
  },
  event: {
    findMany: async () => {
      return await findMany(collections.EVENTS, {}, { sort: { createdAt: -1 } })
    },
    findUnique: async ({ where }: { where: any }) => {
      if (where.id) {
        return await findById(collections.EVENTS, where.id)
      }
      return null
    },
  },
}

// Explicitly exported as default
export default prisma

