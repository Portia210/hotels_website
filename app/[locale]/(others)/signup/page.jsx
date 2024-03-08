import dynamic from 'next/dynamic';
import CallToActions from '@/components/common/CallToActions';
import DefaultHeader from '@/components/header/default-header';
import DefaultFooter from '@/components/footer/default';
import LoginWithSocial from '@/components/common/LoginWithSocial';
import SignUpForm from '@/components/common/SignUpForm';
import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';
import { getTranslations } from 'next-intl/server';

export const metadata = {
  title: 'Sign Up || Agent-Space - Travel & Tour React NextJS Template',
  description: 'Agent-Space - Travel & Tour React NextJS Template',
};

const SignUp = async () => {
  const user = await currentUser();
  if (user) return redirect('/');
  const t = await getTranslations();
  return (
    <>
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <DefaultHeader />
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg bg-blue-2">
        <div className="container">
          <div className="row justify-center">
            <div className="col-xl-6 col-lg-7 col-md-9">
              <div className="px-50 py-50 sm:px-20 sm:py-20 bg-white shadow-4 rounded-4">
                <SignUpForm />
                {/* End SignUP */}

                <div className="row y-gap-20 pt-30">
                  {/* <div className="col-12">
                    <div className="text-center">or sign in with</div>
                  </div>
                  <LoginWithSocial /> */}
                  <div className="col-12">
                    <div className="text-center px-30">
                      {t('LoginForm.terms')}
                    </div>
                  </div>
                </div>
                {/* End .row */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End login section */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <DefaultFooter />
      {/* End Call To Actions Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(SignUp), { ssr: false });
