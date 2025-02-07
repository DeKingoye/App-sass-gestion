// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Autorise tous les domaines
      },
      {
        protocol: "http",
        hostname: "**", // Si certaines images proviennent d'URL non sécurisées
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore les erreurs ESLint pendant la build
  },
  typescript: {
    ignoreBuildErrors: true, // Ajoutez cette option pour ignorer les erreurs TypeScript pendant la build
  },
};

export default nextConfig;
