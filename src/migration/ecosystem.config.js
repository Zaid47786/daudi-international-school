/**
 * PM2 ecosystem config — Asura Hosting / cPanel Node.js / DirectAdmin
 * Start with: pm2 start ecosystem.config.js --env production
 */
export default {
  apps: [
    {
      name: "dis-server",
      script: "server.js",
      interpreter: "node",
      instances: 1,           // Use 1 on shared hosting to save RAM
      exec_mode: "fork",      // fork mode is better on shared hosting
      watch: false,
      max_memory_restart: "256M",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      error_file: "./logs/pm2-err.log",
      out_file: "./logs/pm2-out.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      merge_logs: true,
      autorestart: true,
      restart_delay: 3000,
      min_uptime: "5s",
      max_restarts: 10,
    },
  ],
};