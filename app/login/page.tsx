import AnimatedBackdrop from "@/components/landing/AnimatedBackdrop";
import AuthPanel from "@/components/landing/AuthPanel";

export default function LoginPage() {
  return (
    <div className="relative min-h-[calc(100vh-77px)] flex items-center justify-center px-6 py-16 overflow-hidden">
      <AnimatedBackdrop />

      <div className="relative z-10 flex flex-col items-center gap-10 w-full">
        <div className="text-center flex flex-col items-center gap-4 max-w-lg">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-soft/80">
            Step through the veil
          </span>
          <h1 className="font-display italic text-4xl sm:text-5xl font-semibold text-foreground leading-tight text-balance">
            The cards are already <span className="text-accent">waiting</span> for you
          </h1>
          <p className="text-foreground/60 text-sm max-w-sm leading-relaxed">
            Sign in to keep your readings, or step in as a guest and let the cards speak.
          </p>
        </div>

        <AuthPanel />
      </div>
    </div>
  );
}
