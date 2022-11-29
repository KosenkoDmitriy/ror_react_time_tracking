import React from "react";

const Loader = () => (
  <div className="flex min-h-full w-full flex-col items-center justify-center">
    <svg
      fill="none"
      height="120"
      viewBox="0 0 120 120"
      width="120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 40C15 43.3062 16.3371 46.3001 18.5 48.4705C20.6629 50.6409 20.6629 69.3591 18.5 71.5295C16.3371 73.6999 15 76.6938 15 80C15 86.6274 20.3726 92 27 92C33.6274 92 39 86.6274 39 80C39 76.2104 37.2434 72.8311 34.5 70.6319C31.7566 68.4328 27.7593 50.7358 34.5 52.1768C41.2407 53.6179 47.331 58.2029 48.2714 62.5494C49.4402 67.9522 54.2474 72 60 72C65.8604 72 70.7396 67.799 71.7905 62.2442C72.646 57.7222 78.7882 53.2927 85.5 52.0073C92.2118 50.722 88.2434 68.4328 85.5 70.6319C82.7566 72.8311 81 76.2104 81 80C81 86.6274 86.3726 92 93 92C99.6274 92 105 86.6274 105 80C105 76.6938 103.663 73.6999 101.5 71.5295C99.3371 69.3591 99.3371 50.6409 101.5 48.4705C103.663 46.3001 105 43.3062 105 40C105 33.3726 99.6274 28 93 28C86.9185 28 81.8936 32.5239 81.1071 38.3901C80.3205 44.2563 71.4518 48.9473 63.542 48.5313C60.9006 48.3924 58.7936 48.4832 56.1588 48.628C48.4005 49.0542 39.5855 44.6862 38.9282 38.6799C38.271 32.6736 33.1813 28 27 28C20.3726 28 15 33.3726 15 40Z"
        fill="#5B34EA"
      />
      <circle
        cx="60"
        cy="98"
        fill="#5B34EA"
        r="12"
        transform="rotate(90 60 98)"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          dur="4s"
          repeatCount="indefinite"
          type="translate"
          values="0,0;
            -33,-18;
            -33,-18;
            -33,-58;
            -33,-58;
            0,-38;
            0,-38;
            33,-58;
            33,-58;
            33,-18;
            33,-18;
            0,0;
            0,0"
        />
      </circle>
      <circle
        cx="60"
        cy="22"
        fill="#5B34EA"
        r="12"
        transform="rotate(90 60 22)"
      >
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          dur="4s"
          repeatCount="indefinite"
          type="translate"
          values="0,0;
            33,18;
            33,18;
            33,58;
            33,58;
            0,38;
            0,38;
            -33,58;
            -33,58;
            -33,18;
            -33,18;
            0,0;
            0,0"
        />
      </circle>
    </svg>
  </div>
);

export default Loader;
