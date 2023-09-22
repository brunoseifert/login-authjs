import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import { db as prisma } from "@/lib/db";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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

        if (!credentials?.email || !credentials.password)
          throw new Error("Dados de logins necessários");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Usuário não registrado atraves de credenciais");
        }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        if (!matchPassword) {
          throw new Error("Senha inválida");
        }

        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET!,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/",
  },
};
