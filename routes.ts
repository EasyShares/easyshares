/** @type {string[]} */
export const publicRoutes = [
  "/",
  "/about",
  "/ads",
  "/comming-soon",
  "/contact",
  "/cookie-policy",
  "/faqs",
  "/licence",
  "/privacy-policy",
  "/terms",
  "/under-maintenance",
  "/auth/new-verification",
  "/auth/verify-email",
];

/** @type {string[]} */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/new-password",
  "/auth/reset-password",
];

/** @type {string[]} */
export const UnderMaintenanceRoutes = ["/auth/login", "/under-maintenance"];

/** @type {string[]} */
export const CommingRoutes = ["/auth/login", "/comming-soon"];

/** @type {string} */
export const apiAuthPrefix = "/api/auth";

/** @type {string} */
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

/** @type {string} */
export const DEFAULT_UNDER_MAINTENANCE_REDIRECT = "/under-maintenance";

/** @type {string} */
export const DEFAULT_COMMING_SOON_REDIRECT = "/comming-soon";
