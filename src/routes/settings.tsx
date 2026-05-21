import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AiDisclaimer } from "@/components/AiDisclaimer";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — ProLike" }] }),
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your workspace, AI preferences and privacy.</p>
      </div>

      <Card className="p-6 shadow-soft">
        <h2 className="text-lg font-semibold">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Full name</Label>
            <Input defaultValue="Alex Kim" className="mt-1.5" />
          </div>
          <div>
            <Label>Email</Label>
            <Input defaultValue="alex@prolike.app" className="mt-1.5" />
          </div>
          <div>
            <Label>Role</Label>
            <Input defaultValue="Head of Product" className="mt-1.5" />
          </div>
          <div>
            <Label>Timezone</Label>
            <Input defaultValue="Europe/Berlin (CET)" className="mt-1.5" />
          </div>
        </div>
        <div className="mt-5 flex justify-end">
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">Save changes</Button>
        </div>
      </Card>

      <Card className="p-6 shadow-soft">
        <h2 className="text-lg font-semibold">AI preferences</h2>
        <div className="mt-4 space-y-4">
          {[
            { l: "Auto-plan my day each morning", d: "ProLike generates a draft schedule at 7 AM." },
            { l: "Suggest task priority", d: "Use AI to re-rank tasks by impact." },
            { l: "Summarize meetings automatically", d: "Generate action items from notes." },
            { l: "Show productivity insights weekly", d: "Receive a Friday digest." },
          ].map((s, i) => (
            <div key={s.l} className="flex items-center justify-between gap-4">
              <div>
                <p className="font-medium">{s.l}</p>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
              <Switch defaultChecked={i !== 3} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 shadow-soft">
        <h2 className="text-lg font-semibold">Privacy & responsible AI</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>• Your data is encrypted in transit and at rest.</li>
          <li>• AI prompts and outputs are never used to train shared models.</li>
          <li>• You can export or delete your workspace at any time.</li>
          <li>• ProLike adheres to ethical AI usage and human-in-the-loop principles.</li>
        </ul>
        <div className="mt-4">
          <AiDisclaimer />
        </div>
      </Card>
    </div>
  );
}
