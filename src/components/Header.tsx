import { useLocation } from 'react-router-dom';
import PillNav from './PillNav';
import './Header.css';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const NAV_ITEMS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact',  href: '/contact' },
];

const Header = ({ isDarkMode: _isDarkMode, toggleTheme: _toggleTheme }: HeaderProps) => {
  const { pathname } = useLocation();

  return (
    <header className="header">
      <PillNav
        items={NAV_ITEMS}
        activeHref={pathname}
        baseColor="#0a0a0a"
        pillColor="#161616"
        hoveredPillTextColor="#00f2ff"
        pillTextColor="#ffffff"
        ease="power3.out"
        initialLoadAnimation={true}
      />
    </header>
  );
};

export default Header;
