'use client';

import Link from 'next/link';

import useTrans from '@/hooks/useTrans';
import { useRouter } from 'next/navigation';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import CurrencyMobileMenu from './CurrencyMobileMenu';
import LanguageMobileMenu from './LanguageMobileMenu';

const MobileMenu = ({ isReverse }) => {
  const { t } = useTrans();
  const router = useRouter();

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <Link
          href="/"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: 180,
            maxHeight: 50,
          }}
        >
          <img src="/img/general/logo-dark.svg" alt="brand" />
        </Link>
        {/* End logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="icon icon-close"></i>
        </div>
        {/* icon close */}
      </div>
      {/* End pro-header */}

      <Sidebar width="400" backgroundColor="#fff" rtl={isReverse}>
        <Menu
          menuItemStyles={{
            root: {
              paddingLeft: 3,
            },
          }}
        >
          <MenuItem
            component={
              <CurrencyMobileMenu
                isReverse={isReverse}
                textTran={t('Header.currency')}
              />
            }
          >
            Currency
          </MenuItem>
          <MenuItem
            component={
              <LanguageMobileMenu
                isReverse={isReverse}
                textTran={t('Header.language')}
              />
            }
          />
        </Menu>
        <div className="border-bottom mb-20 mt-20"></div>
        <Menu>
          <MenuItem onClick={() => router.push('/dashboard/db-account')}>
            {t('Header.dashboard')}
          </MenuItem>
          <MenuItem onClick={() => router.push('/')}>
            {t('Header.home')}
          </MenuItem>
          <MenuItem onClick={() => router.push('/user-guide')}>
            {t('Header.userGuide')}
          </MenuItem>
          <MenuItem onClick={() => router.push('/shorten-link')}>
            {t('Header.shortenLink')}
          </MenuItem>
          <MenuItem onClick={() => router.push('/contact')}>
            {t('Header.contact')}
          </MenuItem>
        </Menu>
      </Sidebar>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;
