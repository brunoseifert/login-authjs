import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "email" },
      },
      async authorize(credentials, req): Promise<any> {
        console.log("Authorize method", credentials);
        const user = {
          email: "teste@gmail.com",
          name: "Bruno Seifert",
          passoword: "123456",
        };

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET!,
  debug: process.env.NODE_ENV === "development",
};
