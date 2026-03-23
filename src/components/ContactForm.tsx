'use client';

import { useState } from 'react';
import { Send, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '@/app/actions';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'spam'>('idle');
  const [lastSubmit, setLastSubmit] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Proteção básica de Rate Limiting (1 envio a cada 60 segundos)
    const now = Date.now();
    if (now - lastSubmit < 60000) {
      alert('Por favor, aguarde um minuto antes de enviar novamente.');
      return;
    }

    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    
    try {
      // Chama a Server Action - Nada de URL no console agora!
      const result = await submitContactForm(formData);

      if (result.success) {
        setStatus('success');
        setLastSubmit(Date.now());
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        console.error('Erro de envio:', result.error);
        setStatus('error');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      setStatus('error');
    }
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center justify-center py-20 text-center glass-card rounded-[3rem] border-emerald-500/20"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-6 shadow-2xl shadow-emerald-500/20">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Mensagem Recebida!</h3>
            <p className="text-slate-400 max-w-xs mx-auto">
              Sua ideia agora está nas minhas mãos. Entrarei em contato em breve para torná-la real.
            </p>
          </motion.div>
        ) : (
          <motion.form 
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit} 
            className="space-y-8"
          >
            {/* Honeypot field (hidden from humans) */}
            <input type="text" name="_honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">
                  Seu Nome
                </label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Ex: João Silva"
                  className="w-full px-6 py-4 rounded-2xl glass-card bg-white/5 border-white/5 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 cursor-text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">
                  Seu E-mail
                </label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="w-full px-6 py-4 rounded-2xl glass-card bg-white/5 border-white/5 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 cursor-text"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">
                  Seu Discord
                </label>
                <input
                  required
                  name="discord"
                  type="text"
                  placeholder="usuario#0000"
                  className="w-full px-6 py-4 rounded-2xl glass-card bg-white/5 border-white/5 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 cursor-text"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">
                  O que você precisa?
                </label>
                <select
                  required
                  name="service"
                  className="w-full px-6 py-4 rounded-2xl glass-card bg-white/5 border-white/5 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white appearance-none cursor-pointer"
                >
                  <option value="bot" className="bg-slate-900">Bot para Discord / Telegram</option>
                  <option value="web" className="bg-slate-900">Site / Landing Page</option>
                  <option value="automation" className="bg-slate-900">Automação de Processos</option>
                  <option value="other" className="bg-slate-900">Outro Desafio</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-2">
                Detalhes do Projeto
              </label>
              <textarea
                required
                name="message"
                rows={6}
                placeholder="Descreva sua ideia, funcionalidades principais e objetivos..."
                className="w-full px-6 py-4 rounded-3xl glass-card bg-white/5 border-white/5 focus:border-blue-500/50 focus:bg-white/10 outline-none transition-all text-white placeholder:text-slate-600 resize-none cursor-text"
              />
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full relative group overflow-hidden px-8 py-5 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 shadow-2xl shadow-blue-500/20 cursor-pointer disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <div className="relative flex items-center justify-center gap-3">
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Lançar Projeto
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
              
              {status === 'error' && (
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="text-rose-500 text-center text-xs font-bold"
                >
                  Ocorreu um erro ao enviar. Tente novamente.
                </motion.p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
