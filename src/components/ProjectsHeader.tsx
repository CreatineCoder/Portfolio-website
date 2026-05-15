import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import './ProjectsHeader.css';

const NAV_ITEMS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact',  href: '/contact' },
];

const ProjectsHeader = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const circleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRefs = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweenRefs = useRef<(gsap.core.Tween | null)[]>([]);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;
        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector('.pn-label');
        const hover = pill.querySelector('.pn-label-hover');
        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease: 'power3.out', overwrite: 'auto' }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease: 'power3.out', overwrite: 'auto' }, 0);
        if (hover) {
          gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hover, { y: 0, opacity: 1, duration: 2, ease: 'power3.out', overwrite: 'auto' }, 0);
        }
        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);
    document.fonts?.ready.then(layout).catch(() => {});

    if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { visibility: 'hidden', opacity: 0 });

    const logoEl = logoRef.current;
    const navItems = navItemsRef.current;
    if (logoEl) { gsap.set(logoEl, { scale: 0 }); gsap.to(logoEl, { scale: 1, duration: 0.6, ease: 'power3.out' }); }
    if (navItems) { gsap.set(navItems, { width: 0, overflow: 'hidden' }); gsap.to(navItems, { width: 'auto', duration: 0.6, ease: 'power3.out' }); }

    return () => window.removeEventListener('resize', layout);
  }, []);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease: 'power3.out', overwrite: 'auto' });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease: 'power3.out', overwrite: 'auto' });
  };

  const toggleMobileMenu = () => {
    const next = !isMobileMenuOpen;
    setIsMobileMenuOpen(next);
    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;
    if (hamburger) {
      const lines = hamburger.querySelectorAll<HTMLElement>('.pn-hamburger-line');
      if (next) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3 });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3 });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3 });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3 });
      }
    }
    if (menu) {
      if (next) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
      } else {
        gsap.to(menu, { opacity: 0, y: 10, duration: 0.2, onComplete: () => gsap.set(menu, { visibility: 'hidden' }) });
      }
    }
  };

  return (
    <div className="pn-header-wrap">
      <header className="pn-header">
        <nav className="pn-nav">
          <Link className="pn-logo" to="/" aria-label="Home" ref={logoRef}>
            <span className="pn-logo-text">D</span>
          </Link>

          <div className="pn-nav-items desktop-only" ref={navItemsRef}>
            <ul className="pn-pill-list" role="menubar">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} role="none">
                  <Link
                    role="menuitem"
                    to={item.href}
                    className={`pn-pill${pathname === item.href ? ' is-active' : ''}`}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span className="pn-hover-circle" ref={el => { circleRefs.current[i] = el; }} />
                    <span className="pn-label-stack">
                      <span className="pn-label">{item.label}</span>
                      <span className="pn-label-hover" aria-hidden="true">{item.label}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <button className="pn-hamburger mobile-only" onClick={toggleMobileMenu} aria-label="Toggle menu" ref={hamburgerRef}>
            <span className="pn-hamburger-line" />
            <span className="pn-hamburger-line" />
          </button>
        </nav>

        <div className="pn-mobile-menu mobile-only" ref={mobileMenuRef}>
          <ul className="pn-mobile-list">
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={`pn-mobile-link${pathname === item.href ? ' is-active' : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default ProjectsHeader;
