import './ProjectCard.css';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="project-card">
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <a href={project.link} className="project-link" target="_blank" rel="noopener noreferrer">
          View Project →
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
