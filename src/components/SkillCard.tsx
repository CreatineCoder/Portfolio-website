import './SkillCard.css';

interface SkillCardProps {
  name: string;
}

const SkillCard = ({ name }: SkillCardProps) => {
  return (
    <div className="skill-card">
      <span>{name}</span>
    </div>
  );
};

export default SkillCard;
