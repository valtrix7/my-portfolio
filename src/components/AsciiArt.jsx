import React, { useState, useEffect } from 'react';
import './AsciiArt.css';

const FRAMES = [
  `
           .____.
          /      \\
         |  o  o  |
         |   __   |
          \\______/
            |  |
          __|__|__
         /        \\
        /          \\
  ======================
  |    < REACT.JS >    |
  |  _                 |
  ======================
  /||||||||||||||||||||\\
  `,
  `
           .____.
          /      \\
         |  -  -  |
         |   __   |
          \\______/
            |  |
          __|__|__
         /        \\
        /          \\
  ======================
  |    < REACT.JS >    |
  |  _ _ _             |
  ======================
  /||||||||||||||||||||\\
  `,
  `
           .____.
          /      \\
         |  >  <  |
         |   __   |
          \\______/
            |  |
          __|__|__
         /        \\
        /          \\
  ======================
  |    < REACT.JS >    |
  |  _ _ _ _ _         |
  ======================
  /||||||||||||||||||||\\
  `,
  `
           .____.
          /      \\
         |  o  o  |
         |   __   |
          \\______/
            |  |
          __|__|__
         /        \\
        /          \\
  ======================
  |    < REACT.JS >    |
  |  _ _               |
  ======================
  /||||||||||||||||||||\\
  `
];

export default function AsciiArt() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % FRAMES.length);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="ascii-container">
      <pre className="ascii-text">
{FRAMES[frameIndex]}
      </pre>
    </div>
  );
}
