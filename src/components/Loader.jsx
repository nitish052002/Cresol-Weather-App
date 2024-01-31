import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <>
      <svg className="pl" viewBox="0 0 128 128" width="128px" height="300px">
        <defs>
          <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#000" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
          <mask id="pl-mask">
            <rect x="0" y="0" width="128" height="300" fill="url(#pl-grad)" />
          </mask>
        </defs>
        <g strokeLinecap="round" strokeWidth="8" strokeDasharray="32 32">
          <g stroke="hsl(193,90%,50%)">
            <line className="pl__line1" x1="4" y1="48" x2="4" y2="80" />
            <line className="pl__line2" x1="19" y1="48" x2="19" y2="80" />
            <line className="pl__line3" x1="34" y1="48" x2="34" y2="80" />
            <line className="pl__line4" x1="49" y1="48" x2="49" y2="80" />
            <line className="pl__line5" x1="64" y1="48" x2="64" y2="80" />
          </g>
        </g>
      </svg>
    </>
  );
};

export default Loader;
