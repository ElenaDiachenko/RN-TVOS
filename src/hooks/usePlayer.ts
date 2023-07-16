import { useEffect, useRef, MouseEvent, useState } from 'react';

export const usePlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    const togglePlay = () => {
        const videoContainer = videoRef.current;
        if (videoContainer && (videoContainer.paused || videoContainer.ended)) {
            videoContainer.play();
            setIsPlaying(true);
        } else if (videoContainer) {
            videoContainer.pause();
            setIsPlaying(false);
        }
    };
    const handleProgress = () => {
        const videoContainer = videoRef.current;
        const progressBar = progressBarRef.current;
        if (videoContainer && progressBar) {
            const progressPercentage = (videoContainer.currentTime / videoContainer.duration) * 100;
            progressBar.style.flexBasis = `${progressPercentage}%`;
        }
    };

    const jump = (e: MouseEvent<HTMLDivElement>) => {
        const videoContainer = videoRef.current;
        const progress = progressRef.current;
        if (videoContainer && progress) {
            const position = (e.nativeEvent.offsetX / progress.offsetWidth) * videoContainer.duration;
            videoContainer.currentTime = position;
        }
    };

    useEffect(() => {
        const videoContainer = videoRef.current;
        videoContainer?.addEventListener('timeupdate', handleProgress);

        return () => {
            videoContainer?.removeEventListener('timeupdate', handleProgress);
        };
    }, []);

    return { videoRef, progressRef, progressBarRef, togglePlay, jump, handleProgress, isPlaying };
};
