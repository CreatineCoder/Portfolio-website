import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Hi, I'm [Your Name]</h1>
        <p className="subtitle">A passionate developer building modern web experiences.</p>
        <div className="cta-container">
          <a href="#projects" className="cta-button">View My Work</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
