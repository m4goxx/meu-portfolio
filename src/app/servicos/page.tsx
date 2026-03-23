import { ContactForm } from "@/components/ContactForm";
import { Bot, Cpu, Globe, MessageSquare, Sparkles, Zap } from "lucide-react";
import * as motion from "framer-motion/client";

export default function Services() {
  const services = [
    {
      icon: Bot,
      title: "Bots Inteligentes",
      desc: "Desenvolvimento de bots personalizados para Discord e Telegram com sistemas de economia, moderação e integrações via Webhook.",
      color: "from-blue-500/20 to-cyan-500/20",
      textColor: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Automações Full",
      desc: "Scripts para automação de tarefas repetitivas, web scraping e integração de dados entre diferentes plataformas e APIs.",
      color: "from-amber-500/20 to-orange-500/20",
      textColor: "text-amber-400"
    },
    {
      icon: Globe,
      title: "Desenvolvimento Web",
      desc: "Criação de Landing Pages de alta conversão, Dashboards administrativos e sites institucionais modernos e rápidos.",
      color: "from-purple-500/20 to-pink-500/20",
      textColor: "text-purple-400"
    }
  ];

  return (
    <div className="space-y-24 pt-12">
      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest">
          <Sparkles size={14} />
          Soluções Sob Medida
        </div>
        <h1 className="text-5xl font-black tracking-tight">
          O que posso <br />
          <span className="text-gradient">Construir para Você?</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Transformo necessidades técnicas em ferramentas poderosas que impulsionam seu negócio ou comunidade.
        </p>
      </motion.section>

      {/* Services Cards */}
      <section className="grid grid-cols-1 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`glass-card p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center group hover:border-white/20 transition-all`}
          >
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${s.color} flex items-center justify-center ${s.textColor} flex-shrink-0 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-black/50`}>
              <s.icon size={40} />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-black text-white">{s.title}</h3>
              <p className="text-slate-400 text-lg leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Contact Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="space-y-12"
      >
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black text-white">Vamos Iniciar um Projeto?</h2>
          <p className="text-slate-400 text-lg">Preencha os detalhes abaixo e eu entrarei em contato.</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <ContactForm />
        </div>
      </motion.section>
    </div>
  );
}
