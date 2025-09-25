// middleware.js (root of the project)
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"], // ✅ Protect ONLY /dashboard
};
