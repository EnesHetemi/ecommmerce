import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { getUser } from "@/api/services/User";
import { compare } from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Plotësoni të gjitha fushat");
        }

        const user = await getUser(credentials.email);
        if (!user) {
          throw new Error("Email nuk ekziston");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Fjalëkalimi nuk është i saktë");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          emailVerified: user.emailVerified ?? null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET ?? (() => {
    throw new Error("Mungon NEXTAUTH_SECRET në .env.local");
  })(),
};

export default NextAuth(authOptions);