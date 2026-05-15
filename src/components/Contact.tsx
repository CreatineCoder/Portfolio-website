import { memo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { FiGithub, FiLinkedin, FiMail, FiSend, FiTwitter } from 'react-icons/fi';
import FaultyTerminal from './FaultyTerminal';
import Crosshair from './Crosshair';
import './Contact.css';

const GRID_MUL: [number, number] = [2, 1];

const ContactBackground = memo(() => (
  <div className="contact-bg">
    <FaultyTerminal
      scale={1.5}
      gridMul={GRID_MUL}
      digitSize={1.2}
      timeScale={0.5}
      pause={false}
      scanlineIntensity={0.5}
      glitchAmount={1}
      flickerAmount={1}
      noiseAmp={1}
      chromaticAberration={0}
      dither={0}
      curvature={0.1}
      tint="#A7EF9E"
      mouseReact
      mouseStrength={0.5}
      pageLoadAnimation
      brightness={0.6}
    />
  </div>
));

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form Submitted:', { name, email, message });
    setSent(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="contact" ref={sectionRef}>
      <ContactBackground />
      <Crosshair containerRef={sectionRef} color="#A7EF9E" />

      <div className="contact-container">
        {/* Left panel */}
        <div className="contact-info">
          <p className="contact-label">// CONTACT</p>
          <h2 className="contact-heading">
            Let's <span className="contact-accent">work</span><br />together.
          </h2>
          <p className="contact-sub">
            Have a project in mind, want to collaborate, or just want to say hi?
            My inbox is always open.
          </p>

          <div className="contact-links">
            <a href="mailto:devanshagrawal1027@gmail.com" className="contact-link">
              <FiMail />
              <span>devanshagrawal1027@gmail.com</span>
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <FiGithub />
              <span>github.com/creatinecoder</span>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <FiLinkedin />
              <span>linkedin.com/in/devansh</span>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="contact-link">
              <FiTwitter />
              <span>twitter.com/devansh</span>
            </a>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="contact-form-wrapper">
          <div className="contact-form-inner">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    autoComplete="off"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <button type="submit" className="submit-button" disabled={sent}>
                {sent ? (
                  <span className="sent-label">Message Sent ✓</span>
                ) : (
                  <>
                    <FiSend />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
