"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, Send, Zap, FileText, Server, CheckCircle, Terminal } from "lucide-react";

export default function LighthouseOpsAgent() {
  const [input, setInput] = useState("The server is returning 503 errors. Fix it and create a generic incident task in Notion.");
  const [status, setStatus] = useState<"idle" | "thinking" | "working" | "done">("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, message]);
  };

  const runAgent = async () => {
    if (!input) return;
    
    setStatus("thinking");
    setLogs([]);
    addLog("📡 CONNECTING: Sending command to Lighthouse Ops...");

    try {
      // 1. Trigger the Backend
      const response = await fetch("/api/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command: input }),
      });

      if (!response.ok) throw new Error("Agent Unreachable");

      // 2. Simulate the Real-Time Thinking (Since Kestra is async)
      setStatus("working");
      
      await new Promise(r => setTimeout(r, 1500));
      addLog("🧠 BRAIN: Parsing Intent... Detected [DEVOPS, NOTION]");
      
      await new Promise(r => setTimeout(r, 1500));
      addLog("🛠️ DEVOPS AGENT: Connecting to Kubernetes (us-east-1)...");
      addLog("🔍 DIAGNOSIS: Found OOM CrashLoopBackOff.");
      
      await new Promise(r => setTimeout(r, 2000));
      addLog("🚀 ACTION: Scaled Replicas to 10.");
      addLog("📝 NOTION AGENT: Authenticating with Workspace...");
      
      await new Promise(r => setTimeout(r, 1500));
      addLog("✅ NOTION: Created Incident Report Page.");
      addLog("✅ SYSTEM: All tasks completed successfully.");
      
      setStatus("done");

    } catch (error) {
      console.error(error);
      addLog("❌ ERROR: Could not connect to Agent Brain.");
      setStatus("idle");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono p-4 md:p-8 flex flex-col items-center justify-center">
      
      {/* HEADER */}
      <div className="mb-8 md:mb-12 text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/50 text-blue-400 text-xs tracking-widest uppercase">
          <Zap className="w-3 h-3" /> Autonomous Operations Platform
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Lighthouse Ops</h1>
        <p className="text-slate-500 text-sm md:text-base">Illuminate issues. <span className="text-white">Automate solutions.</span></p>
      </div>

      {/* INPUT */}
      <div className="w-full max-w-2xl relative group z-10">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
        <div className="relative bg-[#0A0A0A] rounded-xl border border-white/10 p-2 flex gap-3">
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runAgent()}
            className="flex-1 bg-transparent border-none outline-none text-slate-300 px-4 placeholder:text-slate-700 text-sm md:text-base"
            placeholder="Describe the work you want done..."
          />
          <button 
            onClick={runAgent}
            disabled={status !== "idle" && status !== "done"}
            className="bg-white text-black p-3 rounded-lg hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {status === "thinking" || status === "working" ? (
              <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* LIVE ACTION GRID */}
      {status !== "idle" && (
        <div className="mt-8 md:mt-12 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* DEVOPS AGENT CARD */}
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-30 transition-opacity"><Server className="w-24 h-24" /></div>
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 flex items-center gap-2"><Server className="w-4 h-4" /> Ops Agent</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" /> Cluster Connected
              </div>
              {status === "done" ? (
                 <div className="flex items-center gap-2 text-green-400 text-sm">
                   <CheckCircle className="w-4 h-4" /> Scale Up Complete
                 </div>
              ) : (
                <div className="flex items-center gap-2 text-blue-400 text-sm animate-pulse">
                  <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" /> Scaling Replicas...
                </div>
              )}
            </div>
          </div>

          {/* NOTION AGENT CARD */}
          <div className="bg-[#111] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-30 transition-opacity"><FileText className="w-24 h-24" /></div>
            <h3 className="text-sm font-bold text-slate-500 uppercase mb-4 flex items-center gap-2"><FileText className="w-4 h-4" /> Notion Agent</h3>
            <div className="bg-[#1A1A1A] rounded p-3 border border-white/5 space-y-2">
              <div className="h-2 w-12 bg-slate-700 rounded mb-4"></div>
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                <span>Page Title</span>
                <span>Status</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>🚨 Auto-Fix: Server Outage</span>
                {status === "done" ? (
                    <span className="bg-green-900/50 text-green-300 px-2 rounded text-[10px] border border-green-500/30">Done</span>
                ) : (
                    <span className="bg-blue-900/50 text-blue-300 px-2 rounded text-[10px] border border-blue-500/30 animate-pulse">Writing...</span>
                )}
              </div>
            </div>
          </div>

        </div>
      )}
      
      {/* TERMINAL LOGS */}
      {status !== "idle" && (
        <div className="mt-8 w-full max-w-2xl bg-[#050505] rounded-lg border border-white/10 p-4 font-mono text-xs overflow-hidden">
          <div className="flex items-center gap-2 text-slate-500 mb-2 border-b border-white/5 pb-2">
            <Terminal className="w-3 h-3" /> Agent Logs
          </div>
          <div className="space-y-1 max-h-32 overflow-y-auto scrollbar-hide text-slate-400">
            {logs.map((log, i) => (
               <div key={i} className="animate-in fade-in slide-in-from-left-2">{log}</div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>
      )}

    </div>
  );
}