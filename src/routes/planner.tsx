import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Plus, Calendar, Clock, Flag } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AiDisclaimer } from "@/components/AiDisclaimer";

export const Route = createFileRoute("/planner")({
  head: () => ({ meta: [{ title: "AI Planner — ProLike" }] }),
  component: Planner,
});

type Task = {
  id: string;
  title: string;
  category: string;
  priority: "High" | "Medium" | "Low";
  time: string;
  done: boolean;
  progress: number;
};

const initial: Task[] = [
  { id: "1", title: "Draft Q4 strategy memo", category: "Strategy", priority: "High", time: "9:00–10:30 AM", done: false, progress: 60 },
  { id: "2", title: "Review design system tokens", category: "Design", priority: "Medium", time: "11:00–11:45 AM", done: false, progress: 20 },
  { id: "3", title: "1:1 with Priya", category: "People", priority: "Medium", time: "2:00–2:30 PM", done: true, progress: 100 },
  { id: "4", title: "Inbox triage", category: "Admin", priority: "Low", time: "4:30–5:00 PM", done: false, progress: 0 },
];

const priorityTone: Record<Task["priority"], "destructive" | "default" | "secondary"> = {
  High: "destructive", Medium: "default", Low: "secondary",
};

function Planner() {
  const [tasks, setTasks] = useState<Task[]>(initial);
  const [generating, setGenerating] = useState(false);

  const toggle = (id: string) =>
    setTasks((t) => t.map((x) => (x.id === id ? { ...x, done: !x.done, progress: !x.done ? 100 : x.progress } : x)));

  const generate = () => {
    setGenerating(true);
    setTimeout(() => {
      setTasks((t) => [
        ...t,
        { id: crypto.randomUUID(), title: "AI: Prep talking points for board call", category: "Strategy", priority: "High", time: "8:30–9:00 AM", done: false, progress: 0 },
        { id: crypto.randomUUID(), title: "AI: Summarize customer feedback batch", category: "Research", priority: "Medium", time: "1:00–1:45 PM", done: false, progress: 0 },
      ]);
      setGenerating(false);
    }, 1100);
  };

  const completed = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Planner</h1>
          <p className="text-muted-foreground">Smart scheduling, prioritization & progress tracking.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Plus className="mr-1 h-4 w-4" /> New task</Button>
          <Button onClick={generate} disabled={generating} className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Sparkles className="mr-1 h-4 w-4" /> {generating ? "Generating…" : "Auto-plan my day"}
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">Today's progress</p>
            <p className="font-display text-2xl font-bold">{completed} / {tasks.length} completed</p>
          </div>
          <div className="w-full max-w-sm">
            <Progress value={(completed / tasks.length) * 100} className="h-2.5" />
          </div>
        </div>
      </Card>

      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This week</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="mt-4 space-y-3">
          {tasks.map((t, i) => (
            <Card
              key={t.id}
              className="group flex items-center gap-4 p-4 shadow-soft transition hover:shadow-elegant animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <button
                onClick={() => toggle(t.id)}
                className={`h-6 w-6 shrink-0 rounded-full border-2 transition ${
                  t.done ? "border-success bg-success" : "border-muted-foreground/40 hover:border-primary"
                }`}
                aria-label="Toggle task"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className={`font-medium ${t.done ? "line-through text-muted-foreground" : ""}`}>
                    {t.title}
                  </p>
                  <Badge variant="outline" className="text-xs">{t.category}</Badge>
                  <Badge variant={priorityTone[t.priority]} className="gap-1 text-xs">
                    <Flag className="h-3 w-3" /> {t.priority}
                  </Badge>
                </div>
                <div className="mt-1.5 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {t.time}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" /> Today</span>
                </div>
                {t.progress > 0 && t.progress < 100 && (
                  <Progress value={t.progress} className="mt-2 h-1.5" />
                )}
              </div>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="week" className="mt-4">
          <Card className="grid grid-cols-2 gap-3 p-5 md:grid-cols-7">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <div key={d} className="rounded-xl border bg-muted/30 p-3">
                <p className="text-xs font-semibold text-muted-foreground">{d}</p>
                <div className="mt-2 space-y-1.5">
                  <div className="rounded-md bg-gradient-primary/10 px-2 py-1 text-[11px]">Standup</div>
                  {i % 2 === 0 && <div className="rounded-md bg-accent px-2 py-1 text-[11px]">Deep work</div>}
                  {i === 2 && <div className="rounded-md bg-destructive/10 px-2 py-1 text-[11px] text-destructive">Board prep</div>}
                </div>
              </div>
            ))}
          </Card>
        </TabsContent>
        <TabsContent value="month" className="mt-4">
          <Card className="p-5">
            <div className="grid grid-cols-7 gap-1.5">
              {Array.from({ length: 35 }).map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-lg border p-1.5 text-[10px] ${
                    i % 7 === 3 ? "bg-gradient-primary/10 border-primary/30" : "bg-card"
                  }`}
                >
                  {i + 1 <= 30 ? i + 1 : ""}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="relative overflow-hidden p-6 shadow-soft">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="relative">
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" /> Smart suggestions
          </div>
          <h3 className="text-lg font-semibold">Your peak focus window is 10–12 AM</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Reserve it for the Q4 strategy memo. Move admin tasks to 4:30 PM when energy dips.
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" className="bg-gradient-primary text-primary-foreground">Apply suggestion</Button>
            <Button size="sm" variant="outline">Dismiss</Button>
          </div>
        </div>
      </Card>

      <AiDisclaimer />
    </div>
  );
}
