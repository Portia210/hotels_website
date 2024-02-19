import { currentUser } from "@clerk/nextjs";

const UserStatus = {
  BANNED: "BANNED",
  DELETED: "DELETED",
};

const UserRoles = {
  USER: "USER",
  SITE_MANAGER: "SITE_MANAGER",
  ADMIN: "ADMIN",
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
export const checkUserRole = async (role) => {
  const user = await currentUser();
  const publicMetadata = user?.publicMetadata;

  if (user && publicMetadata?.role === UserRoles[role]) return true;
  return false;
};
