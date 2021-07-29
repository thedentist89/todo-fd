module.exports = {
  devServer: {
    proxy: {
      "/rest": {
        target: process.env.PROXY_SERVER || "http://127.0.0.1:4000",
        secure: false,
      },
    },
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
