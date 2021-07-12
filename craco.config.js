const proxyOpts = {
  target: process.env.PROXY_SERVER || "http://127.0.0.1:4000",
  secure: false,
};

module.exports = {
  devServer: {
    proxy: ["/rest"].reduce(
      (prev, cur) => ({
        ...prev,
        [cur]: proxyOpts,
      }),
      {}
    ),
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
