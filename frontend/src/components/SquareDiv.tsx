import { useState, useLayoutEffect, useRef } from 'react';

export default function SquareDiv({ 
    children, 
}:{ 
    children: React.ReactNode, 
}) {
  const divRef = useRef(null);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    if (!divRef.current) return;

    // Monitor width modifications continuously
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Retrieve the accurate border-box width
        const currentWidth = entry.borderBoxSize 
          ? entry.borderBoxSize[0].inlineSize 
          : entry.contentRect.width;
          
        setHeight(currentWidth);
      }
    });

    resizeObserver.observe(divRef.current);

    // Clean up listener when unmounting
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div 
      ref={divRef} 
      style={{ 
        display: 'flex',
        justifyContent: 'center',
        width: '100%',          // Or any responsive fluid width
        height: `${height}px`, // Dynamically mapped height value
        // maxWidth: '100vw',
        // maxHeight: '100vh',
        // backgroundColor: 'skyblue',
        transition: 'height 0.1s ease' // Optional smoothing
      }}
    >
      {children}
    </div>
  );
}
