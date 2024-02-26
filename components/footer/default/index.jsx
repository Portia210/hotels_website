import { useTranslations } from 'next-intl';
import ContactInfo from './ContactInfo';
import Copyright from './Copyright';
import FooterContent from './FooterContent';
import useTransServer from '@/hooks/useTransServer';

const index = () => {
  const { t, isReverse } = useTransServer();
  return (
    <footer className="footer -type-1">
      <div className="container" dir={isReverse ? 'rtl' : 'ltr'}>
        <div className="pt-60 pb-60">
          <div className="row y-gap-40 justify-between xl:justify-start">
            <div className="col-xl-4 col-lg-4 col-sm-6">
              <h5 className="text-16 fw-500 mb-30">{t('Footer.contact')}</h5>
              <ContactInfo t={t} />
            </div>
            {/* End col */}

            <FooterContent t={t} />
            {/* End footer menu content */}
          </div>
        </div>
        {/* End footer top */}

        <div className="py-20 border-top-light">
          <Copyright />
        </div>
        {/* End footer-copyright */}
      </div>
      {/* End container */}
    </footer>
  );
};

export default index;
