"use client";

import { Button } from "@erichandsen/ui";
import { SiGithub, SiGoogle } from "@icons-pack/react-simple-icons";

import { signInUser } from "@/actions";

type Props = {
  provider: Parameters<typeof signInUser>[0];
};

function LoginButton({ provider }: Props) {
  return (
    <Button variant="secondary" onClick={() => signInUser(provider)}>
      {provider === "google" ? (
        <SiGoogle className="mr-2 size-[18px]" />
      ) : (
        <SiGithub className="mr-2 size-[18px]" />
      )}
      {provider === "google" ? "Google" : "GitHub"}
    </Button>
  );
}

export default LoginButton;
