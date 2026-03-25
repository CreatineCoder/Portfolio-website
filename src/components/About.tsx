import './About.css';
import TrueFocus from './TrueFocus';
import ScrambledText from './ScrambledText';
import LogoLoop from './LogoLoop';
import { 
  SiReact, 
  SiTypescript, 
  SiNodedotjs, 
  SiCss, 
  SiGit, 
  SiVite, 
  SiJavascript, 
  SiTailwindcss,
  SiHtml5,
  SiFramer
} from 'react-icons/si';

const About = () => {
  const techLogos = [
    { node: <SiReact />, title: "React" },
    { node: <SiTypescript />, title: "TypeScript" },
    { node: <SiJavascript />, title: "JavaScript" },
    { node: <SiNodedotjs />, title: "Node.js" },
    { node: <SiHtml5 />, title: "HTML5" },
    { node: <SiCss />, title: "CSS3" },
    { node: <SiTailwindcss />, title: "Tailwind CSS" },
    { node: <SiGit />, title: "Git" },
    { node: <SiVite />, title: "Vite" },
    { node: <SiFramer />, title: "Framer Motion" },
  ];

  return (
    <section className="about">
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
          <div className="skills-loop-container">
            <LogoLoop
              logos={techLogos}
              speed={60}
              direction="left"
              logoHeight={50}
              gap={80}
              scaleOnHover
              fadeOut
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
