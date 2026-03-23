'use client';

import { usePresence } from '@/hooks/usePresence';
import { cn } from '@/lib/utils';
import { Music, MessageCircle, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';

interface PresenceProps {
  discordId: string;
}

export function Presence({ discordId }: PresenceProps) {
  const { presence, isLoading } = usePresence(discordId);

  if (isLoading || !presence) {
    return <div className="animate-pulse glass-card h-24 w-full rounded-3xl" />;
  }

  const { spotify, discord_status, discord_user } = presence;

  const statusColors = {
    online: 'bg-emerald-500',
    idle: 'bg-amber-500',
    dnd: 'bg-rose-500',
    offline: 'bg-slate-500',
  };

  const statusText = {
    online: 'Online no Discord',
    idle: 'Ausente',
    dnd: 'Não Perturbe',
    offline: 'Offline',
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
      {/* Discord Profile Card */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-6 rounded-[2rem] flex items-center gap-4 group hover:scale-[1.02] transition-transform duration-300"
      >
        <div className="relative flex-shrink-0">
          <div className={cn(
            "absolute -inset-1 rounded-full blur-md opacity-40 group-hover:opacity-60 transition-opacity",
            statusColors[discord_status]
          )} />
          <Image
            src={`https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.png`}
            alt={discord_user.username}
            width={64}
            height={64}
            className="relative rounded-full border-2 border-white/10"
          />
          <div className={cn(
            "absolute bottom-0 right-0 w-4 h-4 border-4 border-[#030712] rounded-full",
            statusColors[discord_status]
          )} />
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-lg font-bold text-white truncate group-hover:text-blue-400 transition-colors">
            @{discord_user.username}
          </h3>
          <p className="text-sm text-slate-400 flex items-center gap-1.5">
            <span className={cn("w-2 h-2 rounded-full", statusColors[discord_status])} />
            {statusText[discord_status]}
          </p>
        </div>
      </motion.div>

      {/* Spotify Card */}
      <FramerAnimatePresence mode="wait">
        {spotify ? (
          <motion.div 
            key="spotify-active"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-card p-6 rounded-[2rem] bg-emerald-500/5 border-emerald-500/10 flex items-center gap-4 group hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={spotify.album_art_url}
                alt={spotify.album}
                fill
                className="rounded-2xl object-cover shadow-lg shadow-emerald-500/20"
              />
              <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1.5 border border-white/10 shadow-xl">
                <Music size={12} className="text-emerald-500 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">
                Listening Now
              </span>
              <h3 className="text-base font-bold text-white truncate leading-tight">
                {spotify.song}
              </h3>
              <p className="text-sm text-slate-400 truncate">
                {spotify.artist}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="spotify-inactive"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="glass-card p-6 rounded-[2rem] flex items-center justify-center text-slate-500 gap-2 border-dashed"
          >
            <Music size={20} className="opacity-20" />
            <span className="text-sm font-medium italic">Não ouvindo nada no momento</span>
          </motion.div>
        )}
      </FramerAnimatePresence>
    </div>
  );
}
