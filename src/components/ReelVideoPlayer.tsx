import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface ReelVideoPlayerProps {
  src: string;
  className?: string;
  imgStyleClass?: string;
  onError?: () => void;
}

export const ReelVideoPlayer: React.FC<ReelVideoPlayerProps> = ({
  src,
  className = '',
  imgStyleClass = '',
  onError
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play().catch(() => {
        // Handle potential autoplay blocking by pausing the visual state
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying, src]);

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      video.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video && video.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * video.duration;
      video.currentTime = newTime;
      setProgress((newTime / video.duration) * 100);
    }
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
    }
  };

  return (
    <div 
      className={`absolute inset-0 w-full h-full rounded-lg z-20 group/player overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className={`w-full h-full ${imgStyleClass} rounded-lg`}
        onTimeUpdate={handleTimeUpdate}
        onError={onError}
        onClick={handleTogglePlay}
      />

      {/* Overlay Controls wrapper - pointer-events-none allows interaction pass-through */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 flex flex-col justify-between p-4 transition-opacity duration-300 ${
          isHovered || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Top spacer */}
        <div className="w-full pointer-events-none" />

        {/* Big visual Center Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <button
            onClick={handleTogglePlay}
            className="pointer-events-auto w-14 h-14 rounded-full bg-black/60 hover:bg-black/85 border border-[#e5a93b]/55 hover:border-[#e5a93b] flex items-center justify-center text-white hover:text-[#e5a93b] active:scale-95 transition-all shadow-[0_0_15px_rgba(0,0,0,0.6)] cursor-pointer"
            aria-label={isPlaying ? "Pause Video" : "Play Video"}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            )}
          </button>
        </div>

        {/* Bottom Control Bar */}
        <div className="w-full space-y-2 pointer-events-auto">
          {/* Progress slider layout */}
          <div 
            className="w-full h-1 bg-zinc-800/80 hover:h-2 rounded-full overflow-hidden cursor-pointer transition-all duration-150"
            onClick={handleProgressClick}
          >
            <div 
              className="h-full bg-gradient-to-r from-[#e5a93b] to-amber-500 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Sub-bar icons */}
          <div className="flex items-center justify-between text-white text-xs select-none font-mono">
            <div className="flex items-center gap-3">
              <button 
                onClick={handleTogglePlay}
                className="hover:text-[#e5a93b] transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <button 
                onClick={handleToggleMute}
                className="hover:text-[#e5a93b] transition-colors cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <button 
              onClick={handleFullscreen}
              className="hover:text-[#e5a93b] transition-colors cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
