import './Header.css';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header = ({ isDarkMode, toggleTheme }: HeaderProps) => {
  return (
    <header className="header">
      <div className="logo">
        <a href="/">Portfolio</a>
      </div>
      <nav className="nav">
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li>
            <button onClick={toggleTheme} className="theme-toggle">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
