'use client';

import { usePresence } from '@/hooks/usePresence';
import { cn } from '@/lib/utils';
import { Music, MessageCircle, ExternalLink, Terminal, Gamepad2 } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence as FramerAnimatePresence } from 'framer-motion';

interface PresenceProps {
  discordId: string;
}

import { useEffect, useState } from 'react';

export function Presence({ discordId }: PresenceProps) {
  const { presence, isLoading } = usePresence(discordId);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || !presence) {
    return <div className="animate-pulse glass-card h-24 w-full rounded-3xl" />;
  }

  const { spotify, discord_status, discord_user, activities } = presence;

  // Filter activities to show what they are doing (excluding Spotify and custom status)
  const filteredActivities = activities?.filter(activity => activity.type !== 2 && activity.type !== 4);

  const getActivityImage = (activity: any) => {
    if (!activity.assets?.large_image) return null;
    if (activity.assets.large_image.startsWith('mp:external/')) {
      return `https://media.discordapp.net/${activity.assets.large_image.replace('mp:external/', 'external/')}`;
    }
    return `https://cdn.discordapp.com/app-assets/${activity.application_id}/${activity.assets.large_image}.png`;
  };

  const formatTime = (start: number) => {
    const diff = currentTime - start;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
  };

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
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-1">
                    Ouvindo agora
                  </span>
                  {spotify.timestamps?.start && (
                    <span className="text-[9px] font-mono text-emerald-500/60 bg-emerald-500/5 px-2 py-0.5 rounded-full border border-emerald-500/10">
                      {formatTime(spotify.timestamps.start)}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white truncate leading-tight">
                  {spotify.song}
                </h3>
                <p className="text-sm text-slate-400 truncate">
                  {spotify.artist}
                </p>
                {/* Progress bar simulation or simple line */}
                <div className="mt-3 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: (spotify.timestamps.end - spotify.timestamps.start) / 1000, ease: "linear" }}
                    className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  />
                </div>
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
      {/* Activities Card */}
      <FramerAnimatePresence mode="popLayout">
        {filteredActivities?.map((activity, index) => {
          const activityImage = getActivityImage(activity);
          const isCoding = activity.name.toLowerCase().includes('visual studio code') || 
                          activity.name.toLowerCase().includes('vscode') ||
                          activity.name.toLowerCase().includes('sublime text') ||
                          activity.name.toLowerCase().includes('cursor');

          return (
            <motion.div 
              key={`${activity.name}-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cn(
                "glass-card p-6 rounded-[2rem] flex items-center gap-4 group hover:scale-[1.02] transition-transform duration-300",
                isCoding ? "bg-blue-500/5 border-blue-500/10" : "bg-purple-500/5 border-purple-500/10"
              )}
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                {activityImage ? (
                  <Image
                    src={activityImage}
                    alt={activity.name}
                    fill
                    className={cn(
                      "rounded-2xl object-cover shadow-lg",
                      isCoding ? "shadow-blue-500/20" : "shadow-purple-500/20"
                    )}
                  />
                ) : (
                  <div className={cn(
                    "w-full h-full rounded-2xl flex items-center justify-center border",
                    isCoding ? "bg-blue-500/10 border-blue-500/20" : "bg-purple-500/10 border-purple-500/20"
                  )}>
                    {isCoding ? <Terminal size={32} className="text-blue-500" /> : <Gamepad2 size={32} className="text-purple-500" />}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1.5 border border-white/10 shadow-xl ring-2 ring-black/50">
                  {isCoding ? <Terminal size={12} className="text-blue-500 animate-pulse" /> : <Gamepad2 size={12} className="text-purple-500 animate-pulse" />}
                </div>
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex justify-between items-start gap-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest mb-1",
                    isCoding ? "text-blue-400" : "text-purple-400"
                  )}>
                    {isCoding ? "Desenvolvendo agora" : "Jogando agora"}
                  </span>
                  {activity.timestamps?.start && (
                    <span className={cn(
                      "text-[9px] font-mono px-2 py-0.5 rounded-full border",
                      isCoding 
                        ? "text-blue-400/60 bg-blue-500/5 border-blue-500/10" 
                        : "text-purple-400/60 bg-purple-500/5 border-purple-500/10"
                    )}>
                      {formatTime(activity.timestamps.start)}
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-white truncate leading-tight group-hover:text-white/90 transition-colors">
                  {activity.name}
                </h3>
                {activity.details && (
                  <p className="text-sm text-slate-400 truncate mt-0.5 font-medium">
                    {activity.details}
                  </p>
                )}
                {activity.state && (
                  <p className="text-xs text-slate-500 truncate mt-1 italic">
                    {activity.state}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </FramerAnimatePresence>
    </div>
  );
}
