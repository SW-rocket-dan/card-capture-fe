import React, { useEffect, useRef, useState } from 'react';
import './TypingAnimation.styles.css';

type TypingAnimationProps = {
  lines: string[];
};

const TypingAnimation = ({ lines }: TypingAnimationProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = Array.from(container.children) as HTMLDivElement[];

    children.forEach((child, index) => {
      child.style.animationDelay = `${index * 2}s`;
    });
  }, [lines]);

  return (
    <div className="wrapper">
      <div ref={containerRef} className="typing-container">
        {lines.map((line, index) => (
          <div key={index} className="typing-demo">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypingAnimation;
