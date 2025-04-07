import { MongoClient } from "mongodb"
import * as bcrypt from "bcrypt"

// This script tests the database connection and basic operations
async function testSetup() {
  console.log("Testing database connection and setup...")

  // Check environment variables
  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL environment variable is missing")
    process.exit(1)
  }

  if (!process.env.MONGODB_DB) {
    console.warn("⚠️ MONGODB_DB environment variable is missing, using default 'tpo_portal'")
  }

  if (!process.env.NEXTAUTH_SECRET) {
    console.error("❌ NEXTAUTH_SECRET environment variable is missing")
    process.exit(1)
  }

  // Test MongoDB connection
  const client = new MongoClient(process.env.DATABASE_URL)

  try {
    await client.connect()
    console.log("✅ Successfully connected to MongoDB")

    const db = client.db(process.env.MONGODB_DB || "tpo_portal")

    // Test collections
    const collections = ["users", "students", "companies", "jobs", "offers", "drives", "departments", "events"]

    for (const collectionName of collections) {
      try {
        const collection = db.collection(collectionName)
        const count = await collection.countDocuments()
        console.log(`✅ Collection '${collectionName}' exists with ${count} documents`)
      } catch (error) {
        console.warn(`⚠️ Collection '${collectionName}' may not exist or is empty`)
      }
    }

    // Test user authentication
    const usersCollection = db.collection("users")
    const testUser = await usersCollection.findOne({ email: "admin@example.com" })

    if (testUser) {
      console.log("✅ Found test user 'admin@example.com'")

      // Test password
      const testPassword = "Admin@123"
      const passwordValid = await bcrypt.compare(testPassword, testUser.password)

      if (passwordValid) {
        console.log("✅ Test user password is valid")
      } else {
        console.error("❌ Test user password is invalid")
      }
    } else {
      console.error("❌ Test user 'admin@example.com' not found. Run the seed-users script first.")
    }

    console.log("\n✅ Setup test completed successfully!")
    console.log("You can now start the application with 'npm run dev' or 'yarn dev'")
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error)
    process.exit(1)
  } finally {
    await client.close()
  }
}

// Run the test
testSetup().catch(console.error)

