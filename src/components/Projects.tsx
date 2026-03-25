import './Projects.css';
import InfiniteMenu from './InfiniteMenu';
import type { Project } from '../types/project';

const Projects = () => {
  const projectData: Project[] = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution with product filtering, cart functionality, and secure checkout.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
      image: 'https://picsum.photos/900/900?random=1'
    },
    {
      id: 2,
      title: 'Weather Dashboard',
      description: 'Real-time weather application using OpenWeather API to display forecasts for any location.',
      tags: ['TypeScript', 'Vite', 'REST API'],
      link: '#',
      image: 'https://picsum.photos/900/900?random=2'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'A productivity tool with drag-and-drop features, task prioritization, and data persistence.',
      tags: ['React', 'Firebase', 'Tailwind CSS'],
      link: '#',
      image: 'https://picsum.photos/900/900?random=3'
    },
    {
        id: 4,
        title: 'Portfolio Website',
        description: 'A modern, interactive portfolio with custom WebGL animations and responsive design.',
        tags: ['React', 'Three.js', 'Framer Motion'],
        link: '#',
        image: 'https://picsum.photos/900/900?random=4'
      }
  ];

  const menuItems = projectData.map(project => ({
    image: project.image || 'https://picsum.photos/900/900?grayscale',
    link: project.link,
    title: project.title,
    description: project.description
  }));

  return (
    <section className="projects">
      <div className="projects-header">
        <h2>Featured Work</h2>
        <p>A selection of projects I've built recently.</p>
      </div>
      <div className="projects-menu-wrapper">
        <InfiniteMenu items={menuItems} scale={1.2} />
      </div>
    </section>
  );
};

export default Projects;
