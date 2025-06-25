/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: false,
    webpack(config) {
      config.module.rules.push({
        test: /\.glsl$/,
        type: 'asset/source', // Treat GLSL as raw string
      });
  
      return config;
    },
  };
  
  export default nextConfig;