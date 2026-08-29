import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="border-b border-border/70 backdrop-blur-sm sticky top-0 z-20 bg-background/80">
      <nav className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-5 grid grid-cols-3 items-center gap-1">
        <div className="justify-self-start flex items-center gap-2 sm:gap-3 min-w-0">
          {session?.user ? (
            <>
              <span className="hidden md:inline font-mono text-xs text-foreground-faint truncate max-w-40">
                {session.user.email}
              </span>
              <LogoutButton />
            </>
          ) : (
            <Link
              href="/login"
              className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-foreground/60 hover:text-accent transition-colors whitespace-nowrap"
            >
              Log In
            </Link>
          )}
        </div>

        <div className="justify-self-center flex items-center gap-2.5 sm:gap-4 flex-nowrap">
          <Link
            href="/"
            className="font-display italic text-xs sm:text-sm px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-linear-to-b from-accent to-accent-dim text-background font-semibold tracking-wide shadow-[0_6px_18px_-6px_rgba(201,162,75,0.6)] whitespace-nowrap"
          >
            Tarot
          </Link>
          <Link
            href="/reading"
            className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-foreground/60 hover:text-accent transition-colors whitespace-nowrap"
          >
            Reading
          </Link>
          <Link
            href="/history"
            className="font-mono text-[10px] sm:text-xs uppercase tracking-wider text-foreground/60 hover:text-accent transition-colors whitespace-nowrap"
          >
            <span className="sm:hidden">Insight</span>
            <span className="hidden sm:inline">More Insight</span>
          </Link>
        </div>

        <div className="justify-self-end">
          <Link
            href="/"
            aria-label="Home"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-border-soft flex items-center justify-center text-accent hover:border-accent-soft/60 hover:text-accent-soft transition-colors"
          >
            <span className="text-sm sm:text-base leading-none">✦</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
