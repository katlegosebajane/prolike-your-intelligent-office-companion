import { createFileRoute } from "@tanstack/react-router";
import { FileText, Plus, Search, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/documents")({
  head: () => ({ meta: [{ title: "Documents — ProLike" }] }),
  component: Documents,
});

const docs = [
  { title: "Q4 Strategy Memo", type: "Memo", updated: "2h ago", tag: "Strategy" },
  { title: "Launch Announcement v3", type: "Draft", updated: "Yesterday", tag: "Marketing" },
  { title: "Customer Interview Synthesis", type: "Report", updated: "2d ago", tag: "Research" },
  { title: "Engineering Onboarding Guide", type: "Wiki", updated: "1w ago", tag: "People" },
  { title: "Board Deck Outline", type: "Slides", updated: "1w ago", tag: "Strategy" },
  { title: "Pricing Teardown", type: "Analysis", updated: "2w ago", tag: "Research" },
];

function Documents() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">All AI-generated and manual office documents.</p>
        </div>
        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Plus className="mr-1 h-4 w-4" /> New document
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          className="h-10 w-full rounded-xl border border-input bg-card pl-9 pr-3 text-sm outline-none focus:border-ring"
          placeholder="Search documents…"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((d, i) => (
          <Card
            key={d.title}
            className="group cursor-pointer p-5 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elegant animate-fade-in"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <button className="rounded-md p-1 opacity-0 transition hover:bg-muted group-hover:opacity-100">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            <h3 className="font-semibold leading-tight">{d.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{d.type} · Updated {d.updated}</p>
            <div className="mt-3">
              <Badge variant="secondary">{d.tag}</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
