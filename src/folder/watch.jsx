// import React, { useState, useRef, useEffect } from "react";
// import { Button } from "@mui/material";

// const format = (v) => String(v).padStart(2, "0");

// export default function Watch() {
//   const [time, setTime] = useState({ hr: 0, min: 0, sec: 0, milli: 0 });
//   const intervalRef = useRef(null);

//   const tick = () =>
//     setTime((t) => {
//       let { hr, min, sec, milli } = t;

//       milli += 1;
//       if (milli === 100) {
//         milli = 0;
//         sec += 1;
//       }
//       if (sec === 60) {
//         sec = 0;
//         min += 1;
//       }
//       if (min === 60) {
//         min = 0;
//         hr += 1;
//       }
//       return { hr, min, sec, milli };
//     });

//   const start = () => {
//     if (intervalRef.current) return;
//     tick();
//     intervalRef.current = setInterval(tick, 10);
//   };

//   const stop = () => {
//     clearInterval(intervalRef.current);
//     intervalRef.current = null;
//   };

//   const reset = () => {
//     stop();
//     setTime({ hr: 0, min: 0, sec: 0, milli: 0 });
//   };

//   useEffect(() => () => stop(), []);

//   const { hr, min, sec, milli } = time;
//   return (
//     <div className="container">
//       <h1>
//         {format(hr)} : {format(min)} : {format(sec)} : {format(milli)}
//       </h1>
//       <div className="buttons">
//         <Button variant="contained" onClick={start}>Start</Button>
//         <Button variant="contained">start</Button>
//         <Button onClick={stop}>Stop</Button>
//         <Button onClick={reset}>Reset</Button>
//       </div>
//     </div>
//   );
// }
