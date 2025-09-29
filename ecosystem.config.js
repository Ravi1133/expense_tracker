module.exports = {
  apps: [
    {
      name: "server",
      script: "dist/server.js", // compiled JS
      watch: false,             // no need to watch in prod
      env: {
        NODE_ENV: "production",
        DATABASE_URL: "postgresql://admin:admin123@localhost:5432/tracker?schema=public",
        REDIS_URL: "redis://localhost:6379",
        PORT: 5000,
      },
    },
  ],
};
