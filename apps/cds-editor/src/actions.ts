"use server";

import { signIn } from "@erichandsen/auth";

export async function signInUser(provider: string) {
  await signIn(provider, {
    redirectTo: "/",
    redirect: true
  });
}
