'use client';

import useSWR from 'swr';

export interface LanyardData {
  discord_user: {
    username: string;
    discriminator: string;
    avatar: string;
    id: string;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: {
    type: number;
    name: string;
    details: string;
    state: string;
    application_id?: string;
    timestamps?: {
      start: number;
      end?: number;
    };
    assets?: {
      large_image: string;
      large_text: string;
      small_image?: string;
      small_text?: string;
    };
  }[];
  listening_to_spotify: boolean;
  spotify?: {
    track_id: string;
    timestamps: {
      start: number;
      end: number;
    };
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function usePresence(discordId: string) {
  const { data, error, isLoading } = useSWR<{ data: LanyardData }>(
    discordId ? `https://api.lanyard.rest/v1/users/${discordId}` : null,
    fetcher,
    { refreshInterval: 5000 }
  );

  return {
    presence: data?.data,
    isLoading,
    isError: error,
  };
}
