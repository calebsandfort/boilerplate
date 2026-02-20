"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Brain,
  MessageSquare,
  HeartPulse,
  History,
  ShieldCheck,
  Shield,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Quote,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const quotes = [
  { text: "The soul becomes dyed with the color of its thoughts.", context: "On the Mental Journal" },
  { text: "You have power over your mind—not outside events.", context: "On Volatility" },
  { text: "Very little is needed to make a happy life; it is all within yourself.", context: "On PnL Obsession" },
  { text: "The best revenge is to be unlike him who performed the injury.", context: "On Revenge Trading" },
]

const sidecarFeatures = [
  "Low-latency FastAPI background agents",
  "High-density mental state visualization",
  "Immersive Stoic debriefing mode",
]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"general" | "philosopher">("general")
  const [currentQuote, setCurrentQuote] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const nextQuote = () => setCurrentQuote((prev) => (prev + 1) % quotes.length)
  const prevQuote = () => setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length)

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-700 rounded-lg flex items-center justify-center shadow-lg shadow-amber-900/40">
                <Brain size={18} className="text-slate-950" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Aurelius <span className="text-amber-500">Mind</span>
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
              >
                Features
              </a>
              <a
                href="#sidecar"
                className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
              >
                Methodology
              </a>
              <Button
                variant="outline"
                className="rounded-full text-xs px-5 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                className="rounded-full text-xs px-5 bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/20"
                asChild
              >
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-400 hover:text-white"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-950 border-t border-slate-900 px-4 py-6 space-y-4">
            <a
              href="#features"
              className="block text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white"
            >
              Features
            </a>
            <a
              href="#sidecar"
              className="block text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-white"
            >
              Methodology
            </a>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 rounded-full text-xs border-slate-700 text-slate-300"
                asChild
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button
                className="flex-1 rounded-full text-xs bg-amber-600 hover:bg-amber-500 text-white"
                asChild
              >
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-28 lg:pt-56 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-amber-600/10 blur-[120px] rounded-full" />
          <div className="absolute top-1/3 right-1/4 translate-x-1/2 w-[600px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800 text-[10px] font-bold uppercase tracking-widest mb-10">
            <span className="text-amber-500 flex items-center gap-1.5">
              <Shield size={10} /> Strategy
            </span>
            <span className="text-slate-700 mx-1">|</span>
            <span className="text-violet-400 flex items-center gap-1.5">
              <Brain size={10} /> Discipline
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter mb-8 leading-[1.05]">
            Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-700">
              Mind
            </span>{" "}
            is the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-violet-400 to-indigo-500">
              Master
            </span>{" "}
            Indicator.
          </h1>

          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-12 leading-relaxed font-light">
            Aurelius Mind is a real-time psychological operating system. It monitors your emotional
            telemetry to ensure you trade your edge—not your trauma.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold text-base transition-all shadow-xl shadow-amber-900/20">
              Download for Desktop
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white border border-slate-700 rounded-full font-bold text-base hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
              Explore the Science <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Dual Core Section */}
      <section className="py-24 bg-slate-900/40 relative" id="concept">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Tab Interface */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl hover:border-slate-700 transition-colors">
              <div className="flex bg-slate-900/50 p-1">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`flex-1 py-3 text-[10px] font-black tracking-[0.2em] rounded-2xl transition-all ${
                    activeTab === "general"
                      ? "bg-amber-600 text-white shadow-lg"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  THE GENERAL
                </button>
                <button
                  onClick={() => setActiveTab("philosopher")}
                  className={`flex-1 py-3 text-[10px] font-black tracking-[0.2em] rounded-2xl transition-all ${
                    activeTab === "philosopher"
                      ? "bg-violet-600 text-white shadow-lg"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  THE PHILOSOPHER
                </button>
              </div>

              <div className="p-10 min-h-[400px] flex flex-col justify-center">
                {activeTab === "general" ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 border border-amber-500/20">
                        <MessageSquare size={24} />
                      </div>
                      <div className="text-[10px] font-mono text-amber-500/60 uppercase tracking-widest">
                        Intervention Active
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white">Stoic Intervention</h3>
                    <p className="text-slate-400 leading-relaxed italic">
                      "FOMO detected. You are deviating from your battle plan. The edge you identified
                      this morning has not changed. Hold your position or stand aside."
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-amber-500/10 text-amber-400 text-[10px] font-bold border border-amber-500/20 rounded">
                        BIAS: FOMO
                      </span>
                      <span className="px-3 py-1 bg-violet-500/10 text-violet-400 text-[10px] font-bold border border-violet-500/20 rounded">
                        REMEDY: PLAN_ADHERENCE
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center text-violet-400 border border-violet-500/20">
                        <HeartPulse size={24} />
                      </div>
                      <div className="text-[10px] font-mono text-violet-400/60 uppercase tracking-widest">
                        Mental Governance Live
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white">Mental Telemetry</h3>
                    <p className="text-slate-400 leading-relaxed">
                      Real-time emotional state mapping. Identify the specific mood patterns that lead
                      to your most costly execution errors.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                        <span>Anxiety Threshold</span>
                        <span className="text-red-400">Critical</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-violet-500 to-red-500 w-[88%]" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Side */}
            <div className="lg:pl-10 space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white leading-tight">
                  A Single Vision.
                  <br />
                  <span className="text-amber-500 font-serif italic">Dual Sovereignty.</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  Aurelius Mind provides the psychological oversight required to govern a modern trading
                  desk—combining intervention with introspection.
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-amber-500 border border-slate-800 group-hover:border-amber-500/50 transition-colors">
                    <MessageSquare size={22} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">The General's Intervention</h4>
                    <p className="text-slate-400 mt-1">
                      Live AI coaching that triggers on tilt, FOMO, or any deviation from your declared
                      battle plan.
                    </p>
                  </div>
                </div>
                <div className="flex gap-6 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-violet-400 border border-slate-800 group-hover:border-violet-500/50 transition-colors">
                    <HeartPulse size={22} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">The Philosopher's Mirror</h4>
                    <p className="text-slate-400 mt-1">
                      A real-time behavioral interface that maps your emotional patterns against your
                      trading results.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-28" id="features">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
              The Complete Psychological Stack
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Three integrated systems working in concert to keep your mind sharp when markets test
              your discipline.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare size={28} />,
                title: "Stoic Intervention",
                body: "Live AI coaching that triggers when sentiment analysis detects tilt, FOMO, or deviation from your battle plan.",
              },
              {
                icon: <HeartPulse size={28} />,
                title: "Mental Telemetry",
                body: "Map your emotional states in real-time. Identify the specific mood patterns that lead to your most costly execution errors.",
              },
              {
                icon: <History size={28} />,
                title: "Timescale Insights",
                body: "Longitudinal analysis of your psychological performance. See the 'Equity Curve' of your mental discipline over months.",
              },
            ].map(({ icon, title, body }) => (
              <div
                key={title}
                className="rounded-3xl border border-slate-800 bg-slate-950/50 p-10 flex flex-col gap-6 hover:border-violet-500/30 transition-colors group"
              >
                <div className="w-14 h-14 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  {icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{title}</h3>
                <p className="text-slate-400 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sidecar Section */}
      <section className="py-28 bg-slate-900/30" id="sidecar">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-8">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              Desktop First // Multi-Monitor Optimized
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Designed for the{" "}
              <span className="text-violet-400 font-serif italic">Sidecar</span>.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Trading terminals demand screen real estate. Aurelius Mind is optimized for vertical
              second monitors and minimal cognitive load. It sits quietly alongside your DOM or
              charts—acting only as the impartial observer you need when the heat rises.
            </p>
            <ul className="space-y-4">
              {sidecarFeatures.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300">
                  <ShieldCheck className="text-violet-500 flex-shrink-0" size={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full max-w-sm mx-auto lg:mx-0">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/50 p-4 shadow-2xl">
              <div className="aspect-[3/4] rounded-2xl bg-slate-950 border border-slate-800 p-8 flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    <span>Live Governance Log</span>
                    <span className="text-violet-500">Live Telemetry</span>
                  </div>
                  <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                    <p className="text-sm text-slate-400 italic">
                      "You are attempting a trade after two consecutive stop-outs. This is your
                      'Revenge Window.' Confirm this follows your plan."
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Anxiety Threshold
                    </span>
                    <span className="text-xs font-bold text-red-400">Critical</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-violet-500 to-red-500 w-[92%]" />
                  </div>
                  <button className="w-full text-[10px] font-bold uppercase tracking-widest py-2.5 rounded-xl border border-violet-500/20 text-violet-400 hover:bg-violet-500/10 transition-colors">
                    Acknowledge Governance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Carousel */}
      <section className="py-36 border-y border-slate-900 bg-slate-950 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-12 text-slate-800">
            <Quote size={64} fill="currentColor" />
          </div>

          <div className="relative h-52 md:h-44 flex items-center justify-center">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 transform ${
                  index === currentQuote
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 pointer-events-none"
                }`}
              >
                <blockquote className="text-2xl md:text-4xl font-serif italic text-slate-200 leading-tight">
                  "{quote.text}"
                </blockquote>
                <div className="mt-8 flex flex-col items-center gap-2">
                  <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px]">
                    Marcus Aurelius
                  </span>
                  <span className="text-violet-400/60 font-mono text-[9px] uppercase tracking-widest">
                    {quote.context}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center items-center gap-6">
            <button
              onClick={prevQuote}
              className="p-2 text-slate-600 hover:text-amber-500 transition-colors"
              aria-label="Previous quote"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="flex gap-2">
              {quotes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuote(index)}
                  aria-label={`Go to quote ${index + 1}`}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    index === currentQuote ? "w-8 bg-amber-500" : "w-2 bg-slate-800 hover:bg-slate-700"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextQuote}
              className="p-2 text-slate-600 hover:text-amber-500 transition-colors"
              aria-label="Next quote"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Download for Desktop
          </h2>
          <p className="text-slate-400 mb-10 text-lg">
            Reserve early access to Aurelius Mind. Limited seats for professional speculators who
            trade their edge, not their emotions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <input
              type="email"
              placeholder="Your email address"
              className="px-6 py-4 bg-slate-900 border border-slate-800 rounded-full focus:outline-none focus:border-amber-500 text-white w-full sm:w-80 text-sm placeholder:text-slate-600"
            />
            <button className="w-full sm:w-auto px-10 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-bold transition-all shadow-xl shadow-amber-900/20 whitespace-nowrap">
              Reserve Access
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-700 rounded-lg flex items-center justify-center shadow-lg shadow-amber-900/40">
              <Brain size={16} className="text-slate-950" />
            </div>
            <span className="font-bold text-white tracking-tight">Aurelius Mind</span>
          </div>
          <div className="text-slate-600 font-mono text-[10px] uppercase tracking-widest text-center">
            The Stoic Operating System for Modern Speculators.
          </div>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Manifesto
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
