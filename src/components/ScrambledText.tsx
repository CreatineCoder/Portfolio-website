import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './ScrambledText.css';

// Note: SplitText and ScrambleTextPlugin are typically paid GSAP plugins.
// If they are not available, this component will need to be refactored
// to use a free alternative like 'split-type' or a custom scramble logic.

export interface ScrambledTextProps {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const ScrambledText: React.FC<ScrambledTextProps> = ({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = '.:',
  className = '',
  style = {},
  children
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!rootRef.current) return;

    // We'll use a standard approach if SplitText is not registered
    const p = rootRef.current.querySelector('p');
    if (!p) return;

    const originalText = p.textContent || '';
    p.innerHTML = originalText
      .split('')
      .map(char => `<span class="char" data-content="${char === '"' ? '&quot;' : char}">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    charsRef.current = Array.from(p.querySelectorAll('.char')) as HTMLElement[];

    const handleMove = (e: PointerEvent) => {
      charsRef.current.forEach(c => {
        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          // If ScrambleTextPlugin is available, it will use it.
          // Otherwise, we can use a simpler GSAP animation.
          gsap.to(c, {
            overwrite: true,
            duration: duration * (1 - dist / radius),
            // Custom scramble fallback if plugin is missing
            onUpdate: function() {
              if (this.progress() < 1) {
                const randomChar = scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                c.innerText = randomChar;
              } else {
                c.innerText = c.dataset.content || '';
              }
            },
            ease: 'none'
          });
        }
      });
    };

    const el = rootRef.current;
    el.addEventListener('pointermove', handleMove);

    return () => {
      el.removeEventListener('pointermove', handleMove);
      p.innerText = originalText;
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
};

export default ScrambledText;
