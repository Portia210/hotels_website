import { authMiddleware, getLocaleOrDefault } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const publicRoutes = ["/","/en", "/he", "/:locale/login", "/:locale/signup"];

const intlMiddleware = createMiddleware({
  locales: ["en", "he"],
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },

  // Ensure that locale specific sign-in pages are public
  publicRoutes: publicRoutes,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
