import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Copy, Download, BookOpen, FileSearch, Mail, Presentation, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AiDisclaimer } from "@/components/AiDisclaimer";
import { toast } from "sonner";

export const Route = createFileRoute("/research")({
  head: () => ({ meta: [{ title: "Research Assistant — ProLike" }] }),
  component: Research,
});

const templates = [
  { id: "summary", label: "Summarize", icon: BookOpen, prompt: "Summarize this topic in 5 bullets:" },
  { id: "analyze", label: "Analyze", icon: FileSearch, prompt: "Provide a SWOT analysis for:" },
  { id: "email", label: "Draft email", icon: Mail, prompt: "Write a professional email about:" },
  { id: "report", label: "Report", icon: FileText, prompt: "Create a structured report on:" },
  { id: "deck", label: "Slide outline", icon: Presentation, prompt: "Outline a 10-slide presentation on:" },
];

const history = [
  "Competitor pricing teardown",
  "Q4 OKR summary",
  "Customer interview synthesis",
  "Market sizing — EMEA SMB",
];

function Research() {
  const [prompt, setPrompt] = useState("Best practices for asynchronous remote team collaboration");
  const [output, setOutput] = useState<string>(`# Async Remote Collaboration — Executive Summary

**Thesis.** High-performing distributed teams treat writing as the default mode of communication and meetings as a fallback.

## Key practices
1. **Single source of truth** — One canonical doc per project; chat references the doc, never replaces it.
2. **Decision logs** — Every decision captured with context, owner, and date. Searchable.
3. **Recorded standups** — 3-minute Loom over a 30-minute call. Async + faster.
4. **Working hours overlap** — Aim for a 3–4 hour core window globally for unblocking.
5. **Explicit response SLAs** — \`#urgent\` < 1h, default < 24h, weekends off.

## Tooling baseline
- Docs: Notion / Confluence
- Tasks: Linear / ProLike Planner
- Sync: Slack with thread discipline
- Video: Loom + Zoom for true synchronous

## References
- GitLab Remote Playbook (2024)
- Doist State of Remote Work
- Harvard Business Review — Distributed Work, 2023`);
  const [loading, setLoading] = useState(false);

  const run = () => {
    setLoading(true);
    setTimeout(() => {
      setOutput(
        `# AI-generated analysis\n\nTopic: **${prompt}**\n\n## Key insights\n1. Insight one with concrete reasoning.\n2. Insight two, evidence-backed.\n3. Insight three with a recommendation.\n\n## Recommended next steps\n- Validate with 3 stakeholder interviews\n- Draft a 1-pager and share for async review\n- Schedule decision meeting within 7 days\n\n## References\n- Source A (2024)\n- Source B (2023)\n- Source C — Industry benchmark`,
      );
      setLoading(false);
    }, 900);
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Research Assistant</h1>
        <p className="text-muted-foreground">Ask, analyze, summarize — ship reports faster.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <div className="space-y-5">
          <Card className="p-5 shadow-soft">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prompt templates</p>
            <div className="flex flex-wrap gap-2">
              {templates.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setPrompt(`${t.prompt} ${prompt}`)}
                  className="inline-flex items-center gap-1.5 rounded-full border bg-card px-3 py-1.5 text-xs font-medium transition hover:bg-accent hover:text-accent-foreground"
                >
                  <t.icon className="h-3.5 w-3.5" /> {t.label}
                </button>
              ))}
            </div>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask a research question or paste content to analyze…"
              className="mt-4 min-h-[120px] resize-none rounded-xl"
            />
            <div className="mt-3 flex justify-end">
              <Button onClick={run} disabled={loading} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
                <Sparkles className="mr-1 h-4 w-4" />
                {loading ? "Generating…" : "Generate"}
              </Button>
            </div>
          </Card>

          <Card className="p-6 shadow-soft">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">AI output</Badge>
                <span className="text-xs text-muted-foreground">Editable · Markdown</span>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="ghost" onClick={() => { navigator.clipboard.writeText(output); toast.success("Copied to clipboard"); }}>
                  <Copy className="mr-1 h-3.5 w-3.5" /> Copy
                </Button>
                <Button size="sm" variant="ghost"><Download className="mr-1 h-3.5 w-3.5" /> Export</Button>
              </div>
            </div>
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="min-h-[420px] resize-none rounded-xl bg-muted/30 font-mono text-sm leading-relaxed"
            />
            <div className="mt-4 rounded-xl border bg-muted/30 p-3">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">References</p>
              <ul className="space-y-1 text-sm">
                <li>• GitLab Remote Playbook (2024)</li>
                <li>• Doist State of Remote Work</li>
                <li>• HBR — Distributed Work, 2023</li>
              </ul>
            </div>
            <div className="mt-4">
              <AiDisclaimer />
            </div>
          </Card>
        </div>

        <aside className="space-y-4">
          <Card className="p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Research history</p>
            <ul className="mt-3 space-y-1">
              {history.map((h) => (
                <li key={h}>
                  <button className="w-full rounded-lg px-2 py-2 text-left text-sm transition hover:bg-accent">
                    {h}
                  </button>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="relative overflow-hidden p-5 shadow-soft">
            <div className="absolute inset-0 bg-gradient-aurora opacity-90" />
            <div className="relative text-primary-foreground">
              <Sparkles className="h-5 w-5" />
              <p className="mt-2 text-sm font-semibold">Tip</p>
              <p className="mt-1 text-xs opacity-90">
                Combine templates: "Summarize → Draft email" turns notes into stakeholder updates in seconds.
              </p>
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}
