import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from "next-intl/middleware";

const publicRoutes = [
  "/",
  "/en",
  "/he",
  "/:locale/pricing",
  "/:locale/sso-callback",
  "/:locale/login",
  "/:locale/signup",
  "/sso-callback",
];

const intlMiddleware = createMiddleware({
  locales: ["en", "he"],
  defaultLocale: "en",
});

export default authMiddleware({
  beforeAuth: (req) => {
    // Execute next-intl middleware before Clerk's auth middleware
    return intlMiddleware(req);
  },
  apiRoutes: ["/api(.*)"],
  // Ensure that locale specific sign-in pages are public
  publicRoutes: publicRoutes,
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
