import { useTranslations } from 'next-intl';
import MainFilterSearchBox from './MainFilterSearchBox';

const index = () => {
  const t = useTranslations();
  return (
    <section className="masthead -type-1 z-5">
      <div className="masthead__bg">
        <img alt="image" src="/img/masthead/1/bg.webp" className="js-lazy" />
      </div>
      <div className="container">
        <div className="row justify-center">
          <div className="col-auto">
            <div className="text-center">
              <h1
                className="text-50 lg:text-40 md:text-30 text-white"
                data-aos="fade-up"
              >
                {t('Hero.headLine')}
              </h1>
              <p
                className="text-white text-18 mt-6 md:mt-10"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                {t('Hero.subHeadLine')} <br/>
                {t('Hero.subHeadLine2')}
              </p>
            </div>
            {/* End hero title */}

            <div
              className="tabs -underline mt-60 js-tabs"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <MainFilterSearchBox />
            </div>
            {/* End tab-filter */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default index;
