const { MongoClient } = require("mongodb")
const bcrypt = require("bcryptjs")

const uri = process.env.DATABASE_URL || "mongodb://localhost:27017"
const dbName = process.env.MONGODB_DB || "cms"

async function seed() {
  console.log("Starting seed process...")

  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db(dbName)

    // Create collections if they don't exist
    const collections = [
      "users",
      "candidates",
      "companies",
      "offers",
      "drives",
      "drive_registrations",
      "referrals",
      "departments",
      "events",
      "scheduled_drives",
      "swec_offers",
    ]

    for (const collectionName of collections) {
      const collectionExists = await db.listCollections({ name: collectionName }).hasNext()
      if (!collectionExists) {
        await db.createCollection(collectionName)
        console.log(`Created collection: ${collectionName}`)
      }
    }

    // Seed users
    const usersCollection = db.collection("users")
    const usersCount = await usersCollection.countDocuments()

    if (usersCount === 0) {
      const hashedPassword = await bcrypt.hash("password123", 10)

      const users = [
        {
          name: "Admin User",
          email: "admin@example.com",
          password: hashedPassword,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "TPO Officer",
          email: "tpo@example.com",
          password: hashedPassword,
          role: "tpo",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Student",
          email: "student@example.com",
          password: hashedPassword,
          role: "student",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Company Rep",
          email: "company@example.com",
          password: hashedPassword,
          role: "company",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      const result = await usersCollection.insertMany(users)
      console.log(`${result.insertedCount} users inserted`)
    } else {
      console.log("Users collection already seeded")
    }

    // Seed departments
    const departmentsCollection = db.collection("departments")
    const departmentsCount = await departmentsCollection.countDocuments()

    if (departmentsCount === 0) {
      const departments = [
        { name: "Computer Science", code: "CS", createdAt: new Date(), updatedAt: new Date() },
        { name: "Information Technology", code: "IT", createdAt: new Date(), updatedAt: new Date() },
        { name: "Electronics", code: "ECE", createdAt: new Date(), updatedAt: new Date() },
        { name: "Mechanical", code: "ME", createdAt: new Date(), updatedAt: new Date() },
        { name: "Civil", code: "CE", createdAt: new Date(), updatedAt: new Date() },
      ]

      const result = await departmentsCollection.insertMany(departments)
      console.log(`${result.insertedCount} departments inserted`)
    } else {
      console.log("Departments collection already seeded")
    }

    // Seed companies
    const companiesCollection = db.collection("companies")
    const companiesCount = await companiesCollection.countDocuments()

    if (companiesCount === 0) {
      const companies = [
        {
          name: "Tech Innovations Inc.",
          industry: "Technology",
          location: "San Francisco, CA",
          website: "https://techinnovations.example.com",
          contactEmail: "hr@techinnovations.example.com",
          contactPhone: "123-456-7890",
          description: "Leading technology company specializing in AI and machine learning solutions.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Global Finance Group",
          industry: "Finance",
          location: "New York, NY",
          website: "https://globalfinance.example.com",
          contactEmail: "careers@globalfinance.example.com",
          contactPhone: "987-654-3210",
          description: "International financial services provider with operations in over 50 countries.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "EcoSolutions",
          industry: "Environmental",
          location: "Portland, OR",
          website: "https://ecosolutions.example.com",
          contactEmail: "jobs@ecosolutions.example.com",
          contactPhone: "555-123-4567",
          description: "Developing sustainable solutions for environmental challenges.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      const result = await companiesCollection.insertMany(companies)
      console.log(`${result.insertedCount} companies inserted`)
    } else {
      console.log("Companies collection already seeded")
    }

    console.log("Seed completed successfully")
  } catch (error) {
    console.error("Error during seed process:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

seed().catch(console.error)

