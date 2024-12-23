import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config, { }) => {
    // Modify the default Webpack configuration
    config.module.rules.push({
      test: /\.svg$/, // Match all .svg files
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: true, // Optimize SVGs
            svgoConfig: {
              plugins: [
                {
                  name: "removeViewBox",
                  active: false, // Preserve viewBox for responsive SVGs
                },
              ],
            },
            titleProp: true, // Allow the use of the "title" prop
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
