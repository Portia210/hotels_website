import CreateAccount from './CreateAccount';
import Features from './Features';
import FiveMins from './FiveMins';
import Hero from './Hero';
import Intergration from './Integration';
import WhoWeAre from './WhoWeAre';

export default function Landing() {
  return (
    <div className="w-100 h-100 y-gap-20">
      <Hero />

      <WhoWeAre />

      <Features />

      <Intergration />

      <FiveMins />

      <CreateAccount />
    </div>
  );
}
