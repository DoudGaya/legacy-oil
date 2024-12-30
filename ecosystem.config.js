module.exports = {
    apps: [
      {
        name: "next-app",
        script: "C:\\Program Files\\nodejs\\npm.cmd",
        args: "run start",
        cwd: "C:\\path\\to\\your\\nextjs\\project",
        env: {
          NODE_ENV: "production",
        },
      },
    ],
  };
  