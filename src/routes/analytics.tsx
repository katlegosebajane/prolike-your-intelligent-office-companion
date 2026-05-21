import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { TrendingUp, Sparkles, Clock, Target } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — ProLike" }] }),
  component: Analytics,
});

const productivity = [
  { d: "Mon", v: 62 }, { d: "Tue", v: 74 }, { d: "Wed", v: 81 },
  { d: "Thu", v: 78 }, { d: "Fri", v: 88 }, { d: "Sat", v: 40 }, { d: "Sun", v: 30 },
];

const byCategory = [
  { c: "Deep work", h: 14 }, { c: "Meetings", h: 9 },
  { c: "Admin", h: 5 }, { c: "Learning", h: 3 }, { c: "Research", h: 6 },
];

const stats = [
  { label: "Avg productivity", value: "82%", icon: TrendingUp },
  { label: "Focus hours / wk", value: "26.4", icon: Clock },
  { label: "AI assists", value: "138", icon: Sparkles },
  { label: "Goals on track", value: "7 / 9", icon: Target },
];

function Analytics() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">Performance insights powered by AI.</p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 font-display text-3xl font-bold">{s.value}</p>
          </Card>
        ))}
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-5 shadow-soft lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">Productivity trend</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <AreaChart data={productivity} margin={{ left: 0, right: 0, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.72 0.18 295)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="oklch(0.72 0.18 295)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.008 260)" />
                <XAxis dataKey="d" stroke="oklch(0.5 0.02 260)" />
                <YAxis stroke="oklch(0.5 0.02 260)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Area type="monotone" dataKey="v" stroke="oklch(0.55 0.22 275)" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 shadow-soft">
          <h2 className="mb-4 text-lg font-semibold">Time by category</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer>
              <BarChart data={byCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.008 260)" />
                <XAxis dataKey="c" stroke="oklch(0.5 0.02 260)" />
                <YAxis stroke="oklch(0.5 0.02 260)" />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid var(--border)" }} />
                <Bar dataKey="h" fill="oklch(0.55 0.22 275)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="relative overflow-hidden p-6 shadow-soft">
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        <div className="relative">
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" /> Performance insight
          </div>
          <h3 className="text-lg font-semibold">You're shipping 23% more deep work this week</h3>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Strong morning focus on Wed–Fri. Consider extending the pattern to Mon/Tue by moving
            standups to 11 AM to protect early focus windows.
          </p>
        </div>
      </Card>
    </div>
  );
}
