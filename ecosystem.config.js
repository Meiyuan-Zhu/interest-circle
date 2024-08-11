module.exports = {
    apps: [
      {
        name: "backend",
        cwd: "./backend",
        script: "npm",
        args: "start",
        env: {
          NODE_ENV: "production",
        },
      },
      {
        name: "frontend",
        cwd: "./frontend",
        script: "npm",
        args: "start",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  