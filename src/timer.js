import { useState, useRef } from 'react';

export function useTimer() {
    const [time, setTime] = useState("00:00:00.000");
    const [isRunning, setIsRunning] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
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
        setHasStarted(true);
        startTimeRef.current = Date.now();
        timerIntervalRef.current = setInterval(() => {
            const elapsedTime = Date.now() - startTimeRef.current;
            setTime(formatTime(elapsedTime));
        }, 10);
    };

    const stopTimer = () => {
        clearInterval(timerIntervalRef.current);
        setIsRunning(false);
        window.t = parseTime(time);
    };
    function parseTime(t){
        let [hours, minutes, seconds] = t.split(":");
        let res =  parseFloat(seconds) + parseInt(minutes) * 60 + parseInt(hours) * 3600;
        console.log("parsed time", res);
        return res;

    }

    return {
        time,
        isRunning,
        hasStarted,
        startTimer,
        stopTimer
    };
}
