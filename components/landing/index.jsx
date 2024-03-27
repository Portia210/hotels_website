import CreateAccount from './CreateAccount';
import Features from './Features';
import FiveMins from './FiveMins';
import Hero from './Hero';
import Intergration from './Integration';
import WhoWeAre from './WhoWeAre';

export default function Landing() {
  return (
    <>
      <Hero />

      <div className="mx-50">
        <WhoWeAre />
      </div>

      <Features />

      <div className="mt-50">
        <Intergration />
      </div>

      <FiveMins />

      <CreateAccount />
    </>
  );
}
