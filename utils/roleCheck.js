import { currentUser, useUser } from '@clerk/nextjs';

export const UserStatus = {
  BANNED: 'BANNED',
  DELETED: 'DELETED',
  ACTIVE: 'ACTIVE',
  PENDING: 'PENDING',
};

export const UserRoles = {
  USER: 'USER',
  SITE_MANAGER: 'SITE_MANAGER',
  ADMIN: 'ADMIN',
};

/**
 * Check user status
 * @returns `true` if user is banned or deleted
 */
export const checkUserStatus = async () => {
  const user = await currentUser();
  const publicMetadata = user?.publicMetadata;

  if (
    (user && publicMetadata?.status === UserStatus.BANNED) ||
    publicMetadata?.status === UserStatus.DELETED
  ) {
    return true;
  }
  return false;
};

/**
 * Check user role
 * @param {string} role - User's role
 * @returns `true` if user role is equal to the given role
 */
export const checkUserRole = async allowRoles => {
  const user = await currentUser();
  const publicMetadata = user?.publicMetadata;

  for (const role of allowRoles) {
    if (user && publicMetadata?.role === role) return true;
  }
  return false;
};

export const checkUserRoleClient = allowRoles => {
  const { user } = useUser();
  const publicMetadata = user?.publicMetadata;

  for (const role of allowRoles) {
    if (user && publicMetadata?.role === role) return true;
  }
  return false;
};

export const getUserRole = async () => {
  const user = await currentUser();
  const publicMetadata = user?.publicMetadata;
  return publicMetadata?.role || null;
};


export const getUserRoleClient = () => {
  const { user } = useUser();
  const publicMetadata = user?.publicMetadata;
  return publicMetadata?.role || 'ADMIN';
};
