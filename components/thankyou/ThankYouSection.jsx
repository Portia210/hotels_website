'use client';

import useTrans from '@/hooks/useTrans';
import { useRouter } from 'next/navigation';

export default function ThankYouSection() {
  const router = useRouter();
  const { t } = useTrans();

  return (
    <div className="bg-white vh-100 d-flex justify-content-center align-items-center mb-3 ms-2 me-2">
      <div className="container " style={{ maxWidth: 600 }}>
        <div className="mb-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="text-success"
            width="75"
            height="75"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
          </svg>
        </div>
        <div className="text-center y-gap-10">
          <h2 className="mb-3">{t('ThankYou.thank_you_purchase')}</h2>
          <p className="fs-5">{t('ThankYou.invoice_sent_email')}</p>
          <p className="fs-5">{t('ThankYou.view_payment_details')}</p>
          <p className="fs-5">{t('ThankYou.need_explanation_user_guide')}</p>
          <div className="container text-center mt-10">
            <div className="row g-0">
              <div className="col-12 col-sm-4">
                <button
                  onClick={() => router.push('/')}
                  type="button"
                  className="btn btn-md btn-outline-primary btn-block mb-3"
                >
                  {t('ThankYou.home_page')}
                </button>
              </div>
              <div className="col-12 col-sm-4">
                <button
                  onClick={() => router.push('/dashboard/db-account')}
                  type="button"
                  className="btn btn-outline-success btn-block mb-3"
                >
                  {t('ThankYou.dashboard')}
                </button>
              </div>
              <div className="col-12 col-sm-4">
                <button
                  onClick={() =>
                    window.open(
                      'https://docs.agent-space.com/user-guide',
                      '_blank',
                    )
                  }
                  type="button"
                  className="btn btn-outline-info btn-block mb-3"
                >
                  {t('ThankYou.user_guide')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
