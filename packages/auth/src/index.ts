import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { accounts, db, sessions, users, verificationTokens } from "@erichandsen/db";
import NextAuth, { type NextAuthResult } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

declare module "next-auth" {
  interface User {
    role: "admin" | "user";
  }
}

const nextAuthResult = NextAuth({
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
export const auth: NextAuthResult["auth"] = nextAuthResult.auth;
export const handlers: NextAuthResult["handlers"] = nextAuthResult.handlers;
export const signIn: NextAuthResult["signIn"] = nextAuthResult.signIn;
export const signOut: NextAuthResult["signOut"] = nextAuthResult.signOut;
