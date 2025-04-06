module.exports = {
  apps: [
    {
      name: "aircas-geoserver",
      script: "./bin/www",
      instances: 4,
      max_memory_restart: "1G",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 16304,
      },
    },
  ],
};
