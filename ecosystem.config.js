module.exports = {
  apps: [
    {
      name: "expense-tracker",
      script: "src/server.ts",           // your entry point
      interpreter: "./node_modules/.bin/ts-node",
      watch: true,                       // restart on file changes
      env: {
        NODE_ENV: "development",
        DATABASE_URL: "postgresql://admin:admin123@localhost:5432/tracker?schema=public",
        REDIS_URL: "redis://localhost:6379",
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: "production",
        DATABASE_URL: "postgresql://admin:admin123@localhost:5432/tracker?schema=public",
        REDIS_URL: "redis://localhost:6379",
        PORT: 5000,
      },
    },
  ],
};
