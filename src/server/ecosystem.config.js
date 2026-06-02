/* eslint-disable no-undef */
/**
 * PM2 process config — used on cPanel / shared hosting
 * Start with: pm2 start ecosystem.config.js
 */
module.exports = {
  apps: [
    {
      name: "dis-server",
      script: "server.js",
      interpreter: "node",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      watch: false,
      max_memory_restart: "300M",
      out_file: "logs/pm2-out.log",
      error_file: "logs/pm2-err.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      min_uptime: "10s",
      max_restarts: 5,
    },
  ],
};