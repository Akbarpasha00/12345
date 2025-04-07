import { hash } from "bcryptjs"
import { MongoClient } from "mongodb"

// MongoDB connection string
const uri = process.env.DATABASE_URL || "mongodb://localhost:27017/cms"

async function seedUsers() {
  console.log("Starting user seed process...")

  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log("Connected to MongoDB")

    const db = client.db()

    // Clear existing users
    await db.collection("users").deleteMany({})
    console.log("Cleared existing users")

    // Create admin user
    const adminPassword = await hash("admin123", 10)

    await db.collection("users").insertOne({
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log("Created admin user")

    // Create TPO user
    const tpoPassword = await hash("tpo123", 10)

    await db.collection("users").insertOne({
      name: "TPO User",
      email: "tpo@example.com",
      password: tpoPassword,
      role: "PLACEMENT_OFFICER",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log("Created TPO user")

    // Create department coordinator user
    const deptCoordPassword = await hash("dept123", 10)

    await db.collection("users").insertOne({
      name: "Department Coordinator",
      email: "dept@example.com",
      password: deptCoordPassword,
      role: "DEPARTMENT_COORDINATOR",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log("Created department coordinator user")

    // Create student user
    const studentPassword = await hash("student123", 10)

    await db.collection("users").insertOne({
      name: "Student User",
      email: "student@example.com",
      password: studentPassword,
      role: "STUDENT",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    console.log("Created student user")

    console.log("User seed completed successfully!")
  } catch (error) {
    console.error("Error during user seed:", error)
  } finally {
    await client.close()
    console.log("MongoDB connection closed")
  }
}

seedUsers().catch((error) => {
  console.error("User seed failed:", error)
  process.exit(1)
})

