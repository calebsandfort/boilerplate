import React, { useState, useEffect } from 'react';
import { 
  Brain, MessageSquare, BarChart3, ShieldCheck, 
  ChevronLeft, ChevronRight, Menu, X, Terminal, 
  Quote, ExternalLink, ArrowRight, HeartPulse, History
} from 'lucide-react';

// --- shadcn/ui inspired components ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const variants = {
    primary: "bg-violet-600 text-white hover:bg-violet-500 shadow-lg shadow-violet-900/40",
    secondary: "bg-slate-900 text-white border border-slate-700 hover:bg-slate-800",
    outline: "bg-transparent border border-slate-800 text-slate-300 hover:bg-slate-900 hover:text-white",
  };
  return (
    <button 
      className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-bold transition-all active:scale-95 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-[0.2em] ${className}`}>
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-[32px] border border-slate-800 bg-slate-950/50 backdrop-blur-sm shadow-2xl ${className}`}>
    {children}
  </div>
);

// --- Main Page ---

const quotes = [
  { text: "The soul becomes dyed with the color of its thoughts.", context: "On the Mental Journal" },
  { text: "You have power over your mind—not outside events.", context: "On Volatility" },
  { text: "Very little is needed to make a happy life; it is all within yourself.", context: "On PnL Obsession" },
  { text: "The best revenge is to be unlike him who performed the injury.", context: "On Revenge Trading" }
];

const App = () => {
  const [currentQuote, setCurrentQuote] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-violet-500/30">
      
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-slate-900 bg-[#020617]/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-400 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg shadow-violet-900/40">
              <Brain className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold tracking-tighter text-white">Aurelius <span className="text-violet-500">Mind</span></span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-10">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Methodology</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Features</a>
            <Button variant="outline" className="px-6 py-2">Sign In</Button>
            <Button variant="primary" className="px-6 py-2">Get Started</Button>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-48 pb-32 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/10 blur-[150px] rounded-full" />
          </div>

          <div className="max-w-[1400px] mx-auto px-8 relative z-10 text-center">
            <Badge className="mb-10">Behavioral Governance for Pro Traders</Badge>
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.95] max-w-4xl mx-auto">
              Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-violet-400 to-indigo-500">Mind</span> is the <br />Master Indicator.
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 font-light leading-relaxed">
              Aurelius Mind is a real-time psychological operating system. It monitors your emotional telemetry to ensure you trade your edge—not your trauma.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="w-full sm:w-auto px-12 h-16 text-lg">Download for Desktop</Button>
              <Button variant="secondary" className="w-full sm:w-auto px-12 h-16 text-lg">Explore the Science</Button>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="py-32 bg-slate-900/20">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-10 flex flex-col gap-6 hover:border-violet-500/30 transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  <MessageSquare size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white">Stoic Intervention</h3>
                <p className="text-slate-400 leading-relaxed">Live AI coaching that triggers when sentiment analysis detects tilt, FOMO, or deviation from your battle plan.</p>
              </Card>

              <Card className="p-10 flex flex-col gap-6 hover:border-violet-500/30 transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  <HeartPulse size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white">Mental Telemetry</h3>
                <p className="text-slate-400 leading-relaxed">Map your emotional states in real-time. Identify the specific mood patterns that lead to your most costly execution errors.</p>
              </Card>

              <Card className="p-10 flex flex-col gap-6 hover:border-violet-500/30 transition-colors group">
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  <History size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white">Timescale Insights</h3>
                <p className="text-slate-400 leading-relaxed">Longitudinal analysis of your psychological performance. See the 'Equity Curve' of your mental discipline over months.</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Desktop Experience Section */}
        <section className="py-32">
          <div className="max-w-[1400px] mx-auto px-8 flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1 space-y-8">
              <Badge>Desktop First // Multi-Monitor Optimized</Badge>
              <h2 className="text-5xl font-bold text-white leading-tight">Designed for the <span className="text-violet-500 italic font-serif">Sidecar</span>.</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Trading terminals demand screen real estate. Aurelius Mind is optimized for vertical second monitors and minimal cognitive load. It sits quietly alongside your DOM or charts, acting only as the impartial observer you need when the heat rises.
              </p>
              <ul className="space-y-4">
                {['Low-latency FastApi background agents', 'High-density mental state visualization', 'Immersive Stoic debriefing mode'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <ShieldCheck className="text-violet-500" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1 w-full">
              <Card className="p-4 bg-slate-900/50">
                <div className="aspect-[3/4] rounded-2xl bg-[#020617] border border-slate-800 p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                      <span>Live Governance Log</span>
                      <span className="text-violet-500">Live Telemetry</span>
                    </div>
                    <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                      <p className="text-sm text-slate-400 italic">"You are attempting a trade after two consecutive stop-outs. This is your 'Revenge Window.' Confirm this follows your plan."</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Anxiety Threshold</span>
                      <span className="text-xs font-bold text-red-400">Critical</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-violet-500 to-red-500 w-[92%]"></div>
                    </div>
                    <Button variant="outline" className="w-full text-xs py-2 rounded-xl border-violet-500/20 text-violet-400">Acknowledge Governance</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Carousel Quotes */}
        <section className="py-40 bg-slate-950 border-y border-slate-900">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div className="flex justify-center mb-12 text-violet-500/20">
              <Quote size={64} fill="currentColor" />
            </div>
            <div className="relative h-48 flex items-center justify-center">
              {quotes.map((quote, idx) => (
                <div 
                  key={idx}
                  className={`absolute inset-0 transition-all duration-700 transform ${idx === currentQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
                >
                  <blockquote className="text-3xl md:text-5xl font-serif italic text-white leading-tight">
                    "{quote.text}"
                  </blockquote>
                  <p className="mt-8 text-violet-400 font-bold tracking-[0.4em] uppercase text-xs">Marcus Aurelius</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-slate-900">
        <div className="max-w-[1400px] mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <Brain size={18} className="text-white" />
            </div>
            <span className="font-bold text-white tracking-tight">Aurelius Mind</span>
          </div>
          <div className="text-slate-600 font-mono text-[10px] uppercase tracking-widest">
            The Stoic Operating System for Modern Speculators.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Manifesto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;