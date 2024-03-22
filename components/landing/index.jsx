import WhoWeAre from './WhoWeAre';
import Hero from './Hero';
import Features from './Features';
import Intergration from './Integration';
import FiveMins from './FiveMins';
import CreateAccount from './CreateAccount';

export default function Landing() {
  return (
    <div className="w-100" dir="rtl">
      <div className="h-100">
        <Hero />
        <WhoWeAre />
        <Features />
        <Intergration />
        <FiveMins />
        <CreateAccount />
      </div>
    </div>
  );
}
