import React, { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";

const format = (v) => String(v).padStart(2, "0");

export default function Stopwatch() {
  const [time, setTime] = useState({ hr: 0, min: 0, sec: 0, milli: 0 });
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);          
 
  const tick = () =>
    setTime((t) => {
      let { hr, min, sec, milli } = t;

      milli += 1;
      if (milli === 100) {
        milli = 0;
        sec += 1;
      }
      if (sec === 60) {
        sec = 0;
        min += 1;
      }
      if (min === 60) {
        min = 0;
        hr += 1;
      }
      return { hr, min, sec, milli };
    });

  const start  = () => {
    if (intervalRef.current) return;         
    tick();                                  
    intervalRef.current = setInterval(tick, 10);
  };

  const stop   = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const reset  = () => {
    stop();
    setTime({ hr: 0, min: 0, sec: 0, milli: 0 });
    setLaps([]);
  };

  const lap    = () => {
    const { hr, min, sec, milli } = time;
    setLaps((ls) => [
      ...ls,
      `${format(hr)} : ${format(min)} : ${format(sec)} : ${format(milli)}`
    ]);
  };

  /* -------  tidy up on unmount ------- */
  useEffect(() => () => stop(), []);

  /* -------------  UI ----------------- */
  const { hr, min, sec, milli } = time;
  return (
    <div className="container">
      <h1>
        {format(hr)} : {format(min)} : {format(sec)} : {format(milli)}
      </h1>

      <div className="buttons">
        <Button sx={{m:2}} variant="contained" color="success" onClick={start}>Start</Button>
        <Button sx={{m:2}} variant="contained" color="error" onClick={stop}>Stop</Button>
        <Button sx={{m:2}} variant="outlined" color="secondary" onClick={reset}>Reset</Button>
        <Button sx={{m:2}} variant="contained" color="primary" onClick={lap}>Lap</Button>
      </div>

      <div className="laps">
        <h2>Lap Times</h2>
        <ul>
          {laps.map((t, i) => (
            <li key={i}>Lap {i + 1}: {t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
