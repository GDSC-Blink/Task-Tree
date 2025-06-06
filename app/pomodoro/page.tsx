"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const Pomodoro: React.FC = () => {
  const [minutes, setMinutes] = useState<number>(25);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isBreak, setIsBreak] = useState<boolean>(false);
  const [cycles, setCycles] = useState<number>(0);
  const [progress, setProgress] = useState<number>(100);

  const totalTime: number = isBreak ? 300 : 1500;
  const currentTime: number = minutes * 60 + seconds;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (interval) clearInterval(interval);

            if (isBreak) {
              setIsBreak(false);
              setMinutes(25);
              setCycles(prevCycles => prevCycles + 1);
            } else {
              setIsBreak(true);
              if (cycles % 4 === 3) {
                setMinutes(15);
              } else {
                setMinutes(5);
              }
            }
            setIsActive(false);
            setProgress(100);
          } else {
            setMinutes(prev => prev - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(prev => prev - 1);
        }

        const newProgress = (currentTime / totalTime) * 100;
        setProgress(newProgress);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, minutes, isBreak, cycles, currentTime, totalTime]);

  function startTimer(): void {
    setIsActive(prev => !prev);
  }

  function resetTimer(): void {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setProgress(100);
  }

  const radius: number = 70;
  const circumference: number = 2 * Math.PI * radius;
  const strokeDashoffset: number = circumference * (1 - progress / 100);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <Link href="/study-techniques">
          <button style={{ color: "blue" }}>← Back to Study Techniques</button>
        </Link>
      </div>

      <h1 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "30px" }}>Pomodoro Technique</h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "400px",
          margin: "0 auto 30px auto",
        }}
      >
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}>
          {isBreak ? "Break Time" : "Pomodoro"}
        </h3>

        <div style={{ position: "relative", width: "250px", height: "250px", margin: "0 auto 20px auto" }}>
          <svg width="100%" height="100%" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle
              cx="100"
              cy="100"
              r={radius}
              fill="none"
              stroke={isBreak ? "blue" : "red"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 100 100)"
            />
          </svg>

          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "32px", fontFamily: "monospace" }}>
              {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <button
            onClick={startTimer}
            style={{
              padding: "10px 20px",
              borderRadius: "5px",
              backgroundColor: isActive ? "red" : "green",
              color: "white",
              marginRight: "10px",
            }}
          >
            {isActive ? "Pause" : "Start"}
          </button>
          <button
            onClick={resetTimer}
            style={{ padding: "10px 20px", borderRadius: "5px", backgroundColor: "gray", color: "white" }}
          >
            Reset
          </button>
        </div>

        <div>Completed cycles: {cycles}</div>
      </div>

      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "15px" }}>How to Use the Pomodoro Technique</h2>
        <ol style={{ paddingLeft: "20px" }}>
          <li>Choose a task you want to complete</li>
          <li>Start the Pomodoro timer (25 minutes)</li>
          <li>Work on the task until the timer rings</li>
          <li>Take a short break (5 minutes)</li>
          <li>After 4 Pomodoros, take a longer break (15-30 minutes)</li>
        </ol>
      </div>
    </div>
  );
};

export default Pomodoro;