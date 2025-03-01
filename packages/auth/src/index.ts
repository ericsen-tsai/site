import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, db, sessions, users, verificationTokens } from "@erichandsen/db";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    role: "admin" | "user";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, GitHub],
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens
  }),
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role;
      return session;
    }
  }
});

export * from "@auth/drizzle-adapter";
export * from "next-auth";
