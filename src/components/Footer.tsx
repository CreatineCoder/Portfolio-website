import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} Devansh Agrawal. All rights reserved.</p>
        <div className="social-links">
          <a href="https://github.com/CreatineCoder" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
