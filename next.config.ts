import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const csp = isDev
  ? "" // Next.js dev mode requires inline scripts/eval — CSP applied in production only
  : "default-src 'self'; script-src 'self' https://maps.googleapis.com; style-src 'self' 'unsafe-inline'; connect-src 'self' https://maps.googleapis.com https://graph.facebook.com; img-src 'self' data:; font-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';";

const nextConfig: NextConfig = {
  async headers() {
    const securityHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=()",
      },
    ];

    if (csp) {
      securityHeaders.push({
        key: "Content-Security-Policy",
        value: csp,
      });
    }

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
