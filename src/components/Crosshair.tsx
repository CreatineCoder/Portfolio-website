import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import { gsap } from 'gsap';

const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

const getMousePos = (e: MouseEvent, container: HTMLElement | null) => {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
  }
  return { x: e.clientX, y: e.clientY };
};

interface CrosshairProps {
  color?: string;
  containerRef?: RefObject<HTMLElement | null> | null;
}

const Crosshair = ({ color = 'white', containerRef = null }: CrosshairProps) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const lineHorizontalRef = useRef<HTMLDivElement | null>(null);
  const lineVerticalRef = useRef<HTMLDivElement | null>(null);
  const filterXRef = useRef<SVGFETurbulenceElement | null>(null);
  const filterYRef = useRef<SVGFETurbulenceElement | null>(null);

  useEffect(() => {
    const mouse = { x: 0, y: 0 };

    const handleMouseMove = (ev: MouseEvent) => {
      const pos = getMousePos(ev, containerRef?.current ?? null);
      mouse.x = pos.x;
      mouse.y = pos.y;

      if (containerRef?.current && lineHorizontalRef.current && lineVerticalRef.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        const out =
          ev.clientX < bounds.left ||
          ev.clientX > bounds.right ||
          ev.clientY < bounds.top ||
          ev.clientY > bounds.bottom;
        gsap.to([lineHorizontalRef.current, lineVerticalRef.current], { opacity: out ? 0 : 1, duration: 0.2 });
      }
    };

    const target: HTMLElement | Window = containerRef?.current ?? window;
    target.addEventListener('mousemove', handleMouseMove as EventListener);

    const renderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 },
    };

    if (lineHorizontalRef.current && lineVerticalRef.current) {
      gsap.set([lineHorizontalRef.current, lineVerticalRef.current], { opacity: 0 });
    }

    let rafId = 0;

    const onFirstMove = () => {
      renderedStyles.tx.previous = renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.previous = renderedStyles.ty.current = mouse.y;
      if (lineHorizontalRef.current && lineVerticalRef.current) {
        gsap.to([lineHorizontalRef.current, lineVerticalRef.current], {
          duration: 0.9,
          ease: 'Power3.easeOut',
          opacity: 1,
        });
      }
      rafId = requestAnimationFrame(render);
      target.removeEventListener('mousemove', onFirstMove as EventListener);
    };

    target.addEventListener('mousemove', onFirstMove as EventListener);

    const primitiveValues = { turbulence: 0 };

    const tl = gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current) lineHorizontalRef.current.style.filter = `url(#filter-noise-x)`;
          if (lineVerticalRef.current) lineVerticalRef.current.style.filter = `url(#filter-noise-y)`;
        },
        onUpdate: () => {
          filterXRef.current?.setAttribute('baseFrequency', String(primitiveValues.turbulence));
          filterYRef.current?.setAttribute('baseFrequency', String(primitiveValues.turbulence));
        },
        onComplete: () => {
          if (lineHorizontalRef.current) lineHorizontalRef.current.style.filter = 'none';
          if (lineVerticalRef.current) lineVerticalRef.current.style.filter = 'none';
        },
      })
      .to(primitiveValues, {
        duration: 0.5,
        ease: 'power1',
        startAt: { turbulence: 1 },
        turbulence: 0,
      });

    const enter = () => tl.restart();
    const leave = () => tl.progress(1).kill();

    const render = () => {
      renderedStyles.tx.current = mouse.x;
      renderedStyles.ty.current = mouse.y;
      for (const key of ['tx', 'ty'] as const) {
        renderedStyles[key].previous = lerp(
          renderedStyles[key].previous,
          renderedStyles[key].current,
          renderedStyles[key].amt,
        );
      }
      if (lineVerticalRef.current) gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
      if (lineHorizontalRef.current) gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });
      rafId = requestAnimationFrame(render);
    };

    const scope: ParentNode = containerRef?.current ?? document;
    const links = scope.querySelectorAll<HTMLAnchorElement | HTMLButtonElement | HTMLInputElement | HTMLTextAreaElement>(
      'a, button, input, textarea',
    );
    links.forEach(el => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      target.removeEventListener('mousemove', handleMouseMove as EventListener);
      target.removeEventListener('mousemove', onFirstMove as EventListener);
      links.forEach(el => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
      cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className="cursor"
      style={{
        position: containerRef ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <svg style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
        <defs>
          <filter id="filter-noise-x">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves={1} ref={filterXRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
          <filter id="filter-noise-y">
            <feTurbulence type="fractalNoise" baseFrequency="0.000001" numOctaves={1} ref={filterYRef} />
            <feDisplacementMap in="SourceGraphic" scale="40" />
          </filter>
        </defs>
      </svg>
      <div
        ref={lineHorizontalRef}
        style={{
          position: 'absolute',
          width: '100%',
          height: '1px',
          background: color,
          pointerEvents: 'none',
          transform: 'translateY(50%)',
          opacity: 0,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
      <div
        ref={lineVerticalRef}
        style={{
          position: 'absolute',
          height: '100%',
          width: '1px',
          background: color,
          pointerEvents: 'none',
          transform: 'translateX(50%)',
          opacity: 0,
          boxShadow: `0 0 10px ${color}`,
        }}
      />
    </div>
  );
};

export default Crosshair;
