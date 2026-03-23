import { Code2, Heart, History, Sparkles, Star } from "lucide-react";
import * as motion from "framer-motion/client";

export default function About() {
  return (
    <div className="space-y-24 relative pt-12">
      <div className="blob top-[-50px] right-[-50px] bg-purple-600/15" />

      {/* Header */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest">
          <Star size={14} />
          Minha Jornada
        </div>
        <h1 className="text-5xl font-black tracking-tight leading-none">
          Codificando com <br />
          <span className="text-gradient">Propósito e Paixão.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          Desde o primeiro "Hello World", minha missão tem sido simplificar a complexidade 
          através de software elegante e eficiente.
        </p>
      </motion.section>

      {/* Story Grid */}
      <section className="grid grid-cols-1 gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-8 items-start"
        >
          <div className="w-16 h-16 rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0 border border-blue-500/20">
            <History size={32} />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">O Início de Tudo</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Tudo começou com a automação de tarefas simples. O que era um hobby se transformou 
              em uma carreira focada em resolver problemas reais. Me especializei em criar 
              ecossistemas digitais que funcionam sozinhos, permitindo que meus clientes foquem no que importa.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row-reverse gap-8 items-start text-left md:text-right"
        >
          <div className="w-16 h-16 rounded-[1.5rem] bg-purple-500/10 flex items-center justify-center text-purple-500 flex-shrink-0 border border-purple-500/20">
            <Code2 size={32} />
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Minha Expertise</h2>
            <div className="flex flex-wrap gap-3 justify-start md:justify-end">
              {["Next.js", "TypeScript", "Node.js", "Python", "C++", "C"].map((skill) => (
                <span key={skill} className="px-4 py-2 rounded-xl glass-card text-sm font-bold text-slate-300">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 rounded-[3rem] text-center space-y-6 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Heart size={48} className="text-red-500 mx-auto animate-pulse" />
          <h2 className="text-3xl font-bold text-white">Minha Filosofia</h2>
          <p className="text-xl text-slate-400 max-w-xl mx-auto leading-relaxed italic">
            "Software não é apenas sobre código, é sobre pessoas. Cada linha que escrevo 
            tem o objetivo de tornar a vida de alguém mais fácil e interessante."
          </p>
        </motion.div>
      </section>
    </div>
  );
}
