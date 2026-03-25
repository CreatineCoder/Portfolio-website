import Hero from '../components/Hero';
import Hyperspeed from '../components/Hyperspeed';

const Home = () => {
  return (
    <div className="home-page">
      <Hyperspeed
        effectOptions={{
          distortion: 'xyDistortion',
          length: 400,
          roadWidth: 9,
          islandWidth: 2,
          lanesPerRoad: 3,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 3,
          carLightsFade: 0.4,
          totalSideLightSticks: 50,
          lightPairsPerRoadWay: 30,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.02, 0.05],
          lightStickHeight: [0.3, 0.7],
          movingAwaySpeed: [20, 50],
          movingCloserSpeed: [-150, -230],
          carLightsLength: [20, 80],
          carLightsRadius: [0.03, 0.08],
          carWidthPercentage: [0.1, 0.5],
          carShiftX: [-0.5, 0.5],
          carFloorSeparation: [0, 0.1],
          colors: {
            roadColor: 0x080808,
            islandColor: 0x0a0a0a,
            background: 0x000000,
            shoulderLines: 0x131318,
            brokenLines: 0x131318,
            leftCars: [0x7d0d1b, 0xa90519, 0xff102a],
            rightCars: [0xf1eece, 0xe6e2b1, 0xdfd98a],
            sticks: 0xf1eece
          }
        }}
      />
      <Hero />
    </div>
  );
};

export default Home;
