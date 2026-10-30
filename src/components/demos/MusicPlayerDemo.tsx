import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Sparkles } from 'lucide-react';
import { playHarmonicChime } from '../../utils/audio';

export const MusicPlayerDemo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(30);

  const tracks = [
    { title: 'Lofi Study Chill Beats', artist: 'Maria Fernanda Beats', duration: '02:45' },
    { title: 'Tokyo Midnight Code', artist: 'Lofi Girl Ambiance', duration: '03:12' },
    { title: 'Pink Neon Rain & Tea', artist: 'Cozy Programmer', duration: '02:58' },
  ];

  const currentTrack = tracks[currentTrackIndex];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    playHarmonicChime(523.25);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="bg-[#1b1424] text-white p-5 rounded-2xl border border-[#ec5a80]/30 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs bg-[#ec5a80]/20 text-[#f9cbd5] px-2.5 py-1 rounded-full border border-[#ec5a80]/30">
          Lofi Anime Player ♡
        </span>
        <span className="text-xs text-neutral-400">Ambiente de foco</span>
      </div>

      {/* Visual album art with animated sound waves */}
      <div className="flex items-center gap-4 mb-5">
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#f498ac]/40 bg-[#281b36] shrink-0">
          <img
            src="/assets/projects/music-thumb.png"
            alt="Album art"
            className="w-full h-full object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 bg-[#ec5a80]/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm sm:text-base text-[#fce7eb] truncate">
            {currentTrack.title}
          </h4>
          <p className="text-xs text-neutral-400 truncate mt-0.5">{currentTrack.artist}</p>

          {/* Equalizer animation */}
          <div className="flex items-end gap-1 h-4 mt-2">
            {[40, 90, 60, 100, 75, 45, 80, 50].map((h, i) => (
              <span
                key={i}
                className="w-1 bg-[#ec5a80] rounded-full transition-all duration-300"
                style={{
                  height: isPlaying ? `${(h * ((progress + i * 15) % 100)) / 100 + 4}px` : '4px',
                  opacity: isPlaying ? 0.9 : 0.3,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1 mb-4">
        <div className="w-full bg-[#2a1e38] h-1.5 rounded-full overflow-hidden cursor-pointer">
          <div
            className="bg-gradient-to-r from-[#ec5a80] to-[#f498ac] h-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
          <span>01:14</span>
          <span>{currentTrack.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-400">
          <Volume2 className="w-4 h-4 text-[#f498ac]" />
          <div className="w-16 bg-[#2a1e38] h-1 rounded-full overflow-hidden">
            <div className="bg-[#f498ac] h-full w-3/4" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setCurrentTrackIndex((prev) => (prev > 0 ? prev - 1 : tracks.length - 1));
              playHarmonicChime(440);
            }}
            className="text-xs text-neutral-300 hover:text-white px-2 py-1 rounded cursor-pointer"
            aria-label="Faixa anterior"
          >
            ⏮
          </button>
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-[#ec5a80] hover:bg-[#d9486e] text-white flex items-center justify-center shadow-lg shadow-[#ec5a80]/30 transition-transform active:scale-95 cursor-pointer"
            aria-label={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={() => {
              setCurrentTrackIndex((prev) => (prev < tracks.length - 1 ? prev + 1 : 0));
              playHarmonicChime(587.33);
            }}
            className="text-xs text-neutral-300 hover:text-white px-2 py-1 rounded cursor-pointer"
            aria-label="Próxima faixa"
          >
            ⏭
          </button>
        </div>

        <span className="text-[11px] text-neutral-400 font-handwriting text-pink-300">
          {isPlaying ? 'Tocando ♪' : 'Pausado'}
        </span>
      </div>
    </div>
  );
};
