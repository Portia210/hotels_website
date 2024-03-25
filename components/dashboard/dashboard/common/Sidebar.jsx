'use client';

import Image from 'next/image';
import Link from 'next/link';

import { isActiveLink } from '@/utils/linkActiveChecker';
import { useClerk } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import useTrans from '@/hooks/useTrans';
import { checkUserRoleClient, UserRoles } from '@/utils/roleCheck';

const Sidebar = () => {
  const { t } = useTrans();
  const { signOut } = useClerk();
  const router = useRouter();
  const pathname = usePathname();

  const allowed = checkUserRoleClient([
    UserRoles.SITE_MANAGER,
    UserRoles.ADMIN,
  ]);

  const allowedAdmin = checkUserRoleClient([UserRoles.ADMIN]);

  const sidebarContentUser = [
    {
      id: 0,
      imgPath: '/img/dashboard/sidebar/compass.svg',
      name: t('Dashboard.Sidebar.dashboard'),
      routePath: '/dashboard/db-dashboard',
    },
    {
      id: 1,
      icon: <i className="bi bi-person"></i>,
      name: t('Dashboard.Sidebar.account'),
      routePath: '/dashboard/db-account',
    },
    {
      id: 3,
      imgPath: '/img/dashboard/sidebar/gear.svg',
      name: t('Dashboard.General.changePassword'),
      routePath: '/dashboard/db-settings',
    },
    {
      id: 4,
      imgPath: '/img/dashboard/sidebar/log-out.svg',
      name: t('Dashboard.Sidebar.logout'),
      routePath: '#',
    },
  ];

  const sidebarContentManager = [
    {
      id: 2,
      icon: <i className="bi bi-people"></i>,
      name: t('Dashboard.Sidebar.userManagement'),
      routePath: '/dashboard/db-user-management',
    },
    {
      id: 5,
      icon: <i className="bi bi-people"></i>,
      name: 'Payment Test',
      routePath: '/dashboard/db-payment-test',
    },
  ];

  const sidebarContentAdmin = [
    {
      id: 6,
      icon: <i className="bi bi-box"></i>,
      name: 'Plan Management',
      routePath: '/dashboard/db-plan-management',
    },
  ];

  const sidebarContent = allowed
    ? sidebarContentUser
        .concat(sidebarContentManager)
        .concat(allowedAdmin ? sidebarContentAdmin : [])
        .sort((a, b) => a.id - b.id)
    : sidebarContentUser;

  const onLogout = routePath => {
    if (routePath !== '#') return;
    signOut().then(() => {
      router.push('/login');
    });
  };

  return (
    <div className="sidebar -dashboard">
      {sidebarContent.map((item, index) => (
        <div className="sidebar__item" key={index}>
          <div
            className={`${
              isActiveLink(item.routePath, pathname) ? '-is-active' : ''
            } sidebar__button `}
          >
            <Link
              href={item.routePath}
              onClick={() => onLogout(item.routePath)}
              className="d-flex items-center text-15 lh-1 fw-500"
            >
              {item?.imgPath ? (
                <Image
                  width={20}
                  height={20}
                  src={item.imgPath}
                  alt="image"
                  className="mr-15"
                />
              ) : (
                <span
                  className="text-24 mr-5 pr-5"
                  style={{
                    color: '#375bd4',
                  }}
                >
                  {item.icon}
                </span>
              )}
              {item.name}
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
