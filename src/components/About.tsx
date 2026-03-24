import './About.css';
import SkillCard from './SkillCard';
import TrueFocus from './TrueFocus';
import ScrambledText from './ScrambledText';

const About = () => {
  const skills = ['React', 'TypeScript', 'Node.js', 'CSS Grid', 'Flexbox', 'Git', 'Vite'];

  return (
    <section id="about" className="about">
      <div className="about-content">
        <TrueFocus 
          sentence="About Me"
          manualMode={false}
          blurAmount={5}
          borderColor="var(--accent-color)"
          animationDuration={0.5}
          pauseBetweenAnimations={1}
        />
        <div className="about-text">
          <ScrambledText
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
          >
            I'm a developer who loves turning complex problems into simple, beautiful, and intuitive designs. My journey into web development started with a curiosity about how things work on the internet, and it has grown into a passion for building robust and scalable applications.
          </ScrambledText>
          <ScrambledText
            radius={100}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
            style={{ marginTop: '1.5rem' }}
          >
            When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through blog posts and community meetups.
          </ScrambledText>
        </div>
        
        <div className="skills-section">
          <h3>My Skills</h3>
          <div className="skills-grid">
            {skills.map((skill) => (
              <SkillCard key={skill} name={skill} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
