/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          // Allow embedding GeeksforGeeks in iframes when possible
          { key: 'X-Frame-Options', value: 'ALLOWALL' },
          // Some browsers respect CSP frame-ancestors; leave permissive for demo
          { key: 'Content-Security-Policy', value: "frame-ancestors 'self' https://*.geeksforgeeks.org https://geeksforgeeks.org;" },
        ],
      },
    ]
  },
};

export default nextConfig;
