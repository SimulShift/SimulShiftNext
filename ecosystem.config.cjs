module.exports = {
  apps: [
    {
      name: 'SimulShift.com',
      instances: 1,
      script: 'npx next start',
      exec_mode: "fork",
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
    },
  ],
}
