import DefaultFooter from '@/components/footer/default';
import DefaultHeader from '@/components/header/default-header';
import { useTranslations } from 'next-intl';

export default function BanPage() {
  const t = useTranslations();
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="text-center fs-5">{t('Banned.message')}</div>
      </section>

      <DefaultFooter />
    </>
  );
}
