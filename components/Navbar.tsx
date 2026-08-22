import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b border-border/70 backdrop-blur-sm sticky top-0 z-20 bg-background/80">
      <nav className="max-w-5xl mx-auto px-6 py-5 grid grid-cols-3 items-center">
        <div className="justify-self-start flex items-center gap-3">
          {session?.user ? (
            <>
              <span className="hidden sm:inline font-mono text-xs text-foreground-faint truncate max-w-40">
                {session.user.email}
              </span>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/"
              className="font-mono text-xs uppercase tracking-wider text-foreground/60 hover:text-accent transition-colors"
            >
              Log In
            </Link>
          )}
        </div>

        <div className="justify-self-center flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="font-display italic text-sm px-3.5 py-1.5 rounded-full bg-linear-to-b from-accent to-accent-dim text-background font-semibold tracking-wide shadow-[0_6px_18px_-6px_rgba(201,162,75,0.6)]"
          >
            Tarot
          </Link>
          <Link
            href="/reading"
            className="font-mono text-xs uppercase tracking-wider text-foreground/60 hover:text-accent transition-colors"
          >
            Reading
          </Link>
          <Link
            href="/history"
            className="font-mono text-xs uppercase tracking-wider text-foreground/60 hover:text-accent transition-colors"
          >
            More Insight
          </Link>
        </div>

        <div className="justify-self-end">
          <Link
            href="/"
            aria-label="Home"
            className="w-9 h-9 rounded-full border border-border-soft flex items-center justify-center text-accent hover:border-accent-soft/60 hover:text-accent-soft transition-colors"
          >
            <span className="text-base leading-none">✦</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
