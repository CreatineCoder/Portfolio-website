import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Hi, I'm [Your Name]</h1>
        <p className="subtitle">A passionate developer building modern web experiences.</p>
        <div className="cta-container">
          <Link to="/projects" className="cta-button">View My Work</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
