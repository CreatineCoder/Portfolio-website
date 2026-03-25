import Hero from '../components/Hero';
import LetterGlitch from '../components/LetterGlitch';

const Home = () => {
  return (
    <div className="home-page">
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
      <Hero />
    </div>
  );
};

export default Home;
