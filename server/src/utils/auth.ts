import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters";
import { PrismaClient } from "@prisma/client";
import { github } from "better-auth/social-providers"
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
            provider: "mysql", 
    }),
});