import CreateAccount from './CreateAccount';
import Features from './Features';
import FiveMins from './FiveMins';
import Hero from './Hero';
import Intergration from './Integration';
import WhoWeAre from './WhoWeAre';

export default function Landing({ t }) {
  return (
    <>
      <Hero t={t} />

      <div className="mx-50">
        <WhoWeAre t={t} />
      </div>

      <Features t={t} />

      <div className="mt-50">
        <Intergration t={t} />
      </div>

      <FiveMins t={t} />

      <CreateAccount t={t} />
    </>
  );
}
