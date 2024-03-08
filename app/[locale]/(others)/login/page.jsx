import CallToActions from '@/components/common/CallToActions';
import LoginForm from '@/components/common/LoginForm';
import DefaultFooter from '@/components/footer/default';
import DefaultHeader from '@/components/header/default-header';
import { currentUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login || Agent-Space - Travel & Tour React NextJS Template',
  description: 'Agent-Space - Travel & Tour React NextJS Template',
};

const LogIn = async () => {
  const user = await currentUser();
  if (user) return redirect('/');

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
                <LoginForm />
                {/* End .Login */}

                <div className="row y-gap-20 pt-30">
                  {/* <div className="col-12">
                    <div className="text-center">or sign in with</div>
                  </div>
                  <LoginWithSocial /> */}
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

export default dynamic(() => Promise.resolve(LogIn), { ssr: false });
