/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, {buildId, dev, isServer, defaultLoaders, webpack}) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
      encoding: 'commonjs encoding',
    })
    return config
  },
  images: {
    domains: ['static-cdn.jtvnw.net'],
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
}

module.exports = nextConfig
