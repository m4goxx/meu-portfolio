import { Presence } from "@/components/Presence";
import { ArrowRight, Code2, Cpu, Globe, Rocket, Terminal, Zap } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";

export default function Home() {
  const DISCORD_ID = "1007778708989427732"; 

  return (
    <div className="space-y-24 relative">
      {/* Background Blobs */}
      <div className="blob top-[-100px] left-[-100px] bg-blue-600/20" />
      <div className="blob bottom-[100px] right-[-100px] bg-purple-600/10" />

      {/* Hero Section */}
      <section className="relative pt-12 text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest">
            <Rocket size={14} />
            Disponível para novos projetos
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[1.1]">
            Transformando <span className="text-gradient">Ideias</span> em <br />
            Realidade Digital.
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            Eu sou o <span className="text-white font-bold">Murilo</span>, desenvolvedor fullstack 
            especializado em automações, bots e experiências web de alta performance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start">
            <Link 
              href="/servicos" 
              className="group relative px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/25"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <span className="relative flex items-center gap-2">
                Solicitar Serviço <ArrowRight size={20} />
              </span>
            </Link>
            <Link 
              href="/sobre" 
              className="px-8 py-4 rounded-2xl glass-card text-white font-bold hover:bg-white/10 transition-all border-white/10"
            >
              Ver Portfólio
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Status Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-6"
      >
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
            Conectado Agora
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
        </div>
        <Presence discordId={DISCORD_ID} />
      </motion.section>

      {/* Services Highlight */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Terminal, title: "Bots Custom", desc: "Discord, Telegram e automações inteligentes.", color: "text-blue-500" },
          { icon: Globe, title: "Web Design", desc: "Sites modernos, rápidos e responsivos.", color: "text-purple-500" },
          { icon: Cpu, title: "Sistemas", desc: "Dashboards e APIs robustas para seu negócio.", color: "text-pink-500" },
        ].map((service, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-8 rounded-[2.5rem] group hover:bg-white/5 transition-colors border-white/5"
          >
            <div className={cn("w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform", service.color)}>
              <service.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Simple Footer Text */}
      <footer className="pt-12 pb-24 text-center">
        <p className="text-slate-600 text-sm font-medium">
          © 2026 Murilo — Desenvolvendo o futuro, um código por vez.
        </p>
      </footer>
    </div>
  );
}
