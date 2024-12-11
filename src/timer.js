import { useState, useRef } from 'react';

export function useTimer() {
    const [time, setTime] = useState("00:00:00.000");
    const [isRunning, setIsRunning] = useState(false);
    const startTimeRef = useRef(null);
    const timerIntervalRef = useRef(null);

    const formatTime = (duration) => {
        const milliseconds = Math.floor(duration % 1000).toString().padStart(3, '0');
        const seconds = Math.floor((duration / 1000) % 60).toString().padStart(2, '0');
        const minutes = Math.floor((duration / (1000 * 60)) % 60).toString().padStart(2, '0');
        const hours = Math.floor(duration / (1000 * 60 * 60)).toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    const startTimer = () => {
        setIsRunning(true);
        startTimeRef.current = Date.now();
        timerIntervalRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTimeRef.current;
            setTime(formatTime(elapsedTime));
        }, 10);
    };

    const stopTimer = () => {
        clearInterval(timerIntervalRef.current);
        setIsRunning(false);
    };

    return {
        time,
        isRunning,
        startTimer,
        stopTimer
    };
}