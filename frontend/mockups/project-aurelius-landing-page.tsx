import React, { useState, useEffect } from 'react';
import { Shield, Brain, Eye, MessageSquare, Target, TrendingUp, ChevronLeft, ChevronRight, Menu, X, Terminal, BarChart3, Sparkles, Quote } from 'lucide-react';

const quotes = [
  {
    text: "You have power over your mind—not outside events. Realize this, and you will find strength.",
    context: "On Market Volatility"
  },
  {
    text: "The impediment to action advances action. What stands in the way becomes the way.",
    context: "On Adapting to Losses"
  },
  {
    text: "If it is not right do not do it; if it is not true do not say it.",
    context: "On Strategy Discipline"
  },
  {
    text: "The soul becomes dyed with the color of its thoughts.",
    context: "On the Mental Journal"
  }
];

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [currentQuote, setCurrentQuote] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % quotes.length);
  const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-700 rounded-lg flex items-center justify-center shadow-lg shadow-amber-900/40">
                <span className="text-slate-950 font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-semibold tracking-tight text-white italic">Project <span className="text-amber-500 not-italic">Aurelius</span></span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#concept" className="text-sm font-medium hover:text-amber-500 transition-colors">The General</a>
              <a href="#philosopher" className="text-sm font-medium hover:text-violet-400 transition-colors">The Philosopher</a>
              <button className="bg-amber-600 hover:bg-amber-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-amber-900/20">
                Reserve Access
              </button>
            </div>

            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-slate-400 hover:text-white">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          {/* Dual Glow */}
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-amber-600/10 blur-[120px] rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-xs font-bold uppercase tracking-widest mb-8">
            <span className="text-amber-500 flex items-center gap-1"><Shield size={12} /> Strategy</span>
            <span className="text-slate-700 mx-2">|</span>
            <span className="text-violet-400 flex items-center gap-1"><Brain size={12} /> Discipline</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-8 leading-[1.1]">
            Forge your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-700">Edge</span>.<br /> 
            Govern your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-violet-400 to-fuchsia-500">Mind</span>.
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light">
            ProjectAurelius.io combines high-frequency visual reconnaissance with real-time psychological coaching. The ultimate synthesis of the General and the Philosopher.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-950 rounded-full font-bold text-lg hover:bg-amber-500 hover:text-white transition-all shadow-xl shadow-white/5">
              Secure ProjectAurelius.io
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white border border-slate-700 rounded-full font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              The Manifesto <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Dual Core Section */}
      <section className="py-24 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* The Switch Interface */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative transition-all duration-500 hover:border-slate-700">
              <div className="flex bg-slate-900/50 p-1">
                <button 
                  onClick={() => setActiveTab('general')}
                  className={`flex-1 py-3 text-xs font-black tracking-[0.2em] rounded-2xl transition-all ${activeTab === 'general' ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  THE GENERAL
                </button>
                <button 
                  onClick={() => setActiveTab('philosopher')}
                  className={`flex-1 py-3 text-xs font-black tracking-[0.2em] rounded-2xl transition-all ${activeTab === 'philosopher' ? 'bg-violet-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  THE PHILOSOPHER
                </button>
              </div>
              
              <div className="p-10 min-h-[400px] flex flex-col justify-center">
                {activeTab === 'general' ? (
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                        <Shield size={24} />
                      </div>
                      <div className="text-[10px] font-mono text-amber-500/60 uppercase tracking-widest">Reconnaissance Active</div>
                    </div>
                    <h3 className="text-3xl font-bold text-white">Tactical Edge Detection</h3>
                    <p className="text-slate-400 leading-relaxed italic">"Scanning NQ 15m... Identifying liquidity sweep below previous day's low. Displacement detected. Your 'Bread & Butter' setup is entering the killzone."</p>
                    <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-2 uppercase">Strategy Confluence</div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-500 w-[82%]"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 border border-violet-500/20">
                        <Brain size={24} />
                      </div>
                      <div className="text-[10px] font-mono text-violet-400/60 uppercase tracking-widest">Mental Governance Live</div>
                    </div>
                    <h3 className="text-3xl font-bold text-white">Stoic Accountability</h3>
                    <p className="text-slate-400 leading-relaxed">"You are hesitating because of your last loss. Stick to the system. Marcus, do not let a past event dictate the present opportunity. Take the trade or walk away."</p>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-violet-500/10 text-violet-400 text-[10px] font-bold border border-violet-500/20 rounded">BIAS: HESITATION</span>
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20 rounded">REMEDY: PLAN_EXECUTION</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:pl-10 space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white leading-tight">A Single Vision. <br /><span className="text-amber-500 font-serif italic">Dual Sovereignty.</span></h2>
                <p className="text-slate-400 text-lg">Project Aurelius provides the high-fidelity oversight required to command a modern trading desk.</p>
              </div>
              
              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-amber-500 border border-slate-800 transition-colors group-hover:border-amber-500/50">
                    <Eye size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">The General’s Recon</h4>
                    <p className="text-slate-400 mt-1">AI vision models that scan your charts in real-time, filtering through the noise to find your precise technical setup.</p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-violet-400 border border-slate-800 transition-colors group-hover:border-violet-500/50">
                    <BarChart3 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">The Philosopher’s Mirror</h4>
                    <p className="text-slate-400 mt-1">A real-time behavioral interface that maps your emotional patterns against your trading results.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Carousel Quote Section */}
      <section className="py-32 border-y border-slate-900 relative overflow-hidden bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-10 text-slate-800">
            <Quote size={60} fill="currentColor" />
          </div>
          
          <div className="relative h-48 md:h-40 flex items-center justify-center">
            {quotes.map((quote, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-1000 transform ${index === currentQuote ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
              >
                <blockquote className="text-2xl md:text-4xl font-serif italic text-slate-200 leading-tight">
                  "{quote.text}"
                </blockquote>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px]">Marcus Aurelius</span>
                  <span className="text-violet-400/60 font-mono text-[9px] uppercase tracking-widest">{quote.context}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center items-center gap-6">
            <button onClick={prevQuote} className="p-2 text-slate-600 hover:text-amber-500 transition-colors">
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {quotes.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1 transition-all duration-500 rounded-full ${index === currentQuote ? 'w-8 bg-amber-500' : 'w-2 bg-slate-800'}`}
                ></div>
              ))}
            </div>
            <button onClick={nextQuote} className="p-2 text-slate-600 hover:text-amber-500 transition-colors">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-violet-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Ready to command your capital?</h2>
          <p className="text-slate-400 mb-10 text-lg">Join the private beta for ProjectAurelius.io. Limited seats for professional speculators.</p>
          <div className="inline-flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <input 
              type="email" 
              placeholder="Your imperial dispatch (email)" 
              className="px-6 py-4 bg-slate-900 border border-slate-800 rounded-full focus:outline-none focus:border-amber-500 text-white w-full sm:w-80"
            />
            <button className="px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold transition-all shadow-xl shadow-amber-900/20">
              Claim Your Seat
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-500 to-amber-700 rounded flex items-center justify-center">
              <span className="text-slate-950 font-bold text-[10px]">A</span>
            </div>
            <span className="font-semibold text-white tracking-widest text-sm uppercase">Aurelius Protocol</span>
          </div>
          <div className="text-slate-600 text-[10px] uppercase tracking-widest font-mono">
            ProjectAurelius.io // Strategy & Discipline.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;