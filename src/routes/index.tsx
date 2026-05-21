import { createFileRoute } from "@tanstack/react-router";
import {
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  FileText,
  CalendarCheck,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { AiDisclaimer } from "@/components/AiDisclaimer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — ProLike" },
      { name: "description", content: "Your AI productivity command center." },
    ],
  }),
  component: Dashboard,
});

const stats = [
  { label: "Tasks completed", value: "42", delta: "+18%", icon: CheckCircle2, color: "text-success" },
  { label: "Focus hours", value: "6.4h", delta: "+12%", icon: Clock, color: "text-primary" },
  { label: "AI generations", value: "138", delta: "+34%", icon: Sparkles, color: "text-accent-foreground" },
  { label: "Productivity score", value: "92", delta: "+5pt", icon: TrendingUp, color: "text-warning" },
];

const upcoming = [
  { title: "Q4 board presentation draft", time: "Today · 2:00 PM", tag: "High", tone: "destructive" },
  { title: "Sync with design team", time: "Today · 4:30 PM", tag: "Meeting", tone: "secondary" },
  { title: "Review marketing brief", time: "Tomorrow · 10:00 AM", tag: "Medium", tone: "default" },
  { title: "Weekly retrospective", time: "Friday · 3:00 PM", tag: "Recurring", tone: "secondary" },
];

const recommendations = [
  { title: "Batch your emails", body: "You spent 1.2h context-switching. Try a single 30-min slot at 9 AM.", icon: Zap },
  { title: "Defer low-impact tasks", body: "3 tasks could move to next week without missing deadlines.", icon: Sparkles },
  { title: "Block deep work", body: "Your peak focus is 10–12 AM. Reserve it for the board deck.", icon: Clock },
];

function Dashboard() {
  return (
    <div className="space-y-8 p-6 lg:p-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-card p-8 shadow-soft">
        <div className="absolute inset-0 bg-gradient-mesh opacity-70" />
        <div className="relative animate-slide-up">
          <Badge variant="secondary" className="mb-3 gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            All systems on track
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Good morning, <span className="text-gradient">Alex</span>
          </h1>
          <p className="mt-2 max-w-xl text-muted-foreground">
            You have 4 priorities today and 2 AI-drafted documents waiting for review.
            Let's make it productive.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/planner"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-elegant transition hover:opacity-90"
            >
              <CalendarCheck className="h-4 w-4" /> Open planner
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-1.5 rounded-xl border bg-card/80 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-accent"
            >
              <Sparkles className="h-4 w-4" /> Ask AI assistant
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Card
            key={s.label}
            className="group relative overflow-hidden border-border/60 p-5 shadow-soft transition hover:shadow-elegant animate-fade-in"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
                <p className={`mt-1 inline-flex items-center gap-0.5 text-xs font-medium ${s.color}`}>
                  <ArrowUpRight className="h-3 w-3" /> {s.delta}
                </p>
              </div>
              <div className="rounded-xl bg-muted p-2.5 transition group-hover:bg-gradient-primary group-hover:text-primary-foreground">
                <s.icon className="h-4 w-4" />
              </div>
            </div>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Upcoming */}
        <Card className="p-6 shadow-soft lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Upcoming priorities</h2>
              <p className="text-sm text-muted-foreground">AI-prioritized for maximum impact</p>
            </div>
            <Link to="/planner" className="text-sm font-medium text-primary hover:underline">
              View all →
            </Link>
          </div>
          <ul className="divide-y">
            {upcoming.map((u) => (
              <li key={u.title} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-gradient-primary/10 grid place-items-center">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{u.title}</p>
                    <p className="text-xs text-muted-foreground">{u.time}</p>
                  </div>
                </div>
                <Badge variant={u.tone as never}>{u.tag}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        {/* Weekly progress */}
        <Card className="p-6 shadow-soft">
          <h2 className="text-lg font-semibold">Weekly progress</h2>
          <p className="text-sm text-muted-foreground">28 of 36 tasks complete</p>
          <div className="mt-5 space-y-4">
            {[
              { label: "Deep work", v: 82 },
              { label: "Meetings", v: 64 },
              { label: "Admin", v: 48 },
              { label: "Learning", v: 30 },
            ].map((p) => (
              <div key={p.label}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-medium">{p.label}</span>
                  <span className="text-muted-foreground">{p.v}%</span>
                </div>
                <Progress value={p.v} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI Recommendations */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold">AI recommendations</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {recommendations.map((r, i) => (
            <Card
              key={r.title}
              className="relative overflow-hidden border-border/60 p-5 shadow-soft transition hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-aurora text-primary-foreground shadow-glow">
                <r.icon className="h-4 w-4" />
              </div>
              <h3 className="font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6 shadow-soft">
          <div className="mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">Recent research</h2>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span>Competitor pricing teardown</span><span className="text-muted-foreground">2h</span></li>
            <li className="flex justify-between"><span>Q4 OKR summary</span><span className="text-muted-foreground">Yesterday</span></li>
            <li className="flex justify-between"><span>Customer interview synthesis</span><span className="text-muted-foreground">2d</span></li>
          </ul>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="mb-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-semibold">Chat activity</h2>
          </div>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span>Draft launch announcement</span><span className="text-muted-foreground">12 msgs</span></li>
            <li className="flex justify-between"><span>Plan offsite agenda</span><span className="text-muted-foreground">8 msgs</span></li>
            <li className="flex justify-between"><span>SQL query helper</span><span className="text-muted-foreground">4 msgs</span></li>
          </ul>
        </Card>
      </div>

      <AiDisclaimer />
      <AiDisclaimer variant="footer" />
    </div>
  );
}
