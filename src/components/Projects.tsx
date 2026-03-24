import './Projects.css';
import ProjectCard from './ProjectCard';
import type { Project } from '../types/project';

const Projects = () => {
  const projectData: Project[] = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with product filtering, cart functionality, and secure checkout.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#'
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'Real-time weather application using OpenWeather API to display forecasts for any location.',
      tags: ['TypeScript', 'Vite', 'REST API'],
      link: '#'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'A productivity tool with drag-and-drop features, task prioritization, and data persistence.',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      link: '#'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="projects-container">
        <div className="projects-header">
          <h2>Featured Work</h2>
          <p>A selection of projects I've built recently.</p>
        </div>
        <div className="projects-grid">
          {projectData.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
