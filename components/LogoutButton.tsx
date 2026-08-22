"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="font-mono text-xs uppercase tracking-wider text-foreground/60 hover:text-accent transition-colors"
    >
      Log Out
    </button>
  );
}
