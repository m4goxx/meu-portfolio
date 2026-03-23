'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, User, Briefcase, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/sobre', label: 'Sobre', icon: User },
  { href: '/servicos', label: 'Serviços', icon: Briefcase },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="px-6 py-4 rounded-[2rem] glass-card border-white/10 shadow-2xl flex items-center gap-2"
      >
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "relative flex items-center gap-3 px-5 py-2.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300",
                isActive ? "text-white" : "text-slate-500 hover:text-slate-300"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-blue-600 rounded-2xl -z-10 shadow-lg shadow-blue-500/40"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
              <Icon size={18} className={cn("transition-transform", isActive && "scale-110")} />
              <span className="hidden sm:block">{label}</span>
            </Link>
          );
        })}
      </motion.div>
    </nav>
  );
}
