import { ShieldAlert } from "lucide-react";

export function AiDisclaimer({ variant = "inline" }: { variant?: "inline" | "footer" }) {
  if (variant === "footer") {
    return (
      <footer className="mt-12 border-t bg-muted/30 px-6 py-6 text-xs text-muted-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ProLike — Intelligent office productivity.</p>
          <p className="flex items-center gap-2">
            <ShieldAlert className="h-3.5 w-3.5" />
            AI outputs may be inaccurate. Verify critical information. We respect your data privacy.
          </p>
        </div>
      </footer>
    );
  }
  return (
    <div className="flex items-start gap-2 rounded-lg border border-warning/30 bg-warning/5 px-3 py-2 text-xs text-muted-foreground">
      <ShieldAlert className="mt-0.5 h-3.5 w-3.5 text-warning" />
      <span>
        AI-generated content may contain errors. Always verify important outputs and follow your
        organization's ethical AI usage policies.
      </span>
    </div>
  );
}
