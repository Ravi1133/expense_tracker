import { PrismaClient } from "../generated/prisma";

export const prisma = new PrismaClient();

export async function connectionFunction() {
  try {
    // console.log("Connecting to PostgreSQL...");
    await prisma.$connect();
    console.log("Connected to PostgreSQL");

  } catch (error) {
    console.error("Error during DB operation", error);
  } 
}

// Call the function (for testing)
// connectionFunction();
