import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Mic, Paperclip, RotateCcw, Pencil, Bot, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AiDisclaimer } from "@/components/AiDisclaimer";

export const Route = createFileRoute("/chat")({
  head: () => ({ meta: [{ title: "AI Chat — ProLike" }] }),
  component: Chat,
});

type Msg = { id: string; role: "user" | "assistant"; content: string };

const suggestions = [
  "Draft a launch announcement for our new feature",
  "Plan a 3-day offsite for 12 people",
  "Summarize this meeting transcript into action items",
  "Write a polite follow-up email",
];

const conversations = [
  { id: "1", title: "Launch announcement draft", time: "2h" },
  { id: "2", title: "Offsite planning", time: "Yesterday" },
  { id: "3", title: "SQL query helper", time: "2d" },
];

function Chat() {
  const [messages, setMessages] = useState<Msg[]>([
    { id: "a1", role: "assistant", content: "Hi Alex! I'm your ProLike assistant. What would you like to work on today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            "Here's a draft based on your request:\n\n**Key points**\n• Anchor on the customer benefit, not the feature spec\n• Lead with one crisp sentence\n• Close with a clear CTA\n\nWant me to make it shorter, more formal, or add a quote?",
        },
      ]);
      setTyping(false);
    }, 1100);
  };

  const regenerate = () => {
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last?.role === "assistant") {
          copy[copy.length - 1] = { ...last, content: last.content + "\n\n_(Regenerated with a more concise tone.)_" };
        }
        setTyping(false);
        return copy;
      });
    }, 800);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      {/* Sidebar conversations */}
      <aside className="hidden w-72 shrink-0 border-r bg-card/40 p-4 lg:block">
        <Button className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90">
          <Sparkles className="mr-1 h-4 w-4" /> New chat
        </Button>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent</p>
        <ul className="mt-2 space-y-1">
          {conversations.map((c) => (
            <li key={c.id}>
              <button className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left text-sm transition hover:bg-accent">
                <span className="truncate">{c.title}</span>
                <span className="text-xs text-muted-foreground">{c.time}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main chat */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-4 py-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-5">
            {messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""} animate-fade-in`}>
                {m.role === "assistant" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-glow">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`group max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-soft ${
                    m.role === "user"
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-card border"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  {m.role === "assistant" && (
                    <div className="mt-2 flex gap-1 opacity-0 transition group-hover:opacity-100">
                      <button onClick={regenerate} className="rounded-md p-1 hover:bg-muted" aria-label="Regenerate">
                        <RotateCcw className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded-md p-1 hover:bg-muted" aria-label="Edit">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
                {m.role === "user" && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-1 rounded-2xl border bg-card px-4 py-3 shadow-soft">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div className="mx-auto w-full max-w-3xl px-4 pb-2 lg:px-8">
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border bg-card px-3 py-1.5 text-xs transition hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t bg-background/70 p-4 backdrop-blur-xl">
          <div className="mx-auto max-w-3xl">
            <Card className="flex items-end gap-2 p-2 shadow-soft">
              <Button variant="ghost" size="icon" aria-label="Attach"><Paperclip className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" aria-label="Voice"><Mic className="h-4 w-4" /></Button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Message ProLike AI…"
                className="flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
              />
              <Button
                onClick={() => send()}
                disabled={!input.trim()}
                size="icon"
                className="bg-gradient-primary text-primary-foreground hover:opacity-90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </Card>
            <div className="mt-3">
              <AiDisclaimer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
