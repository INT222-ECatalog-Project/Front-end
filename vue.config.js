// module.exports = {
//   devServer: {
//     proxy: {
//       "/api": {
//         target: "http://52.187.114.221:9000/",
//         pathRewrite: { "^/api": "" },
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// };
module.exports = {
  devServer: {
      // proxy: {
      //   "^/api": "http://localhost:9000/"
      // },
      proxy: "http://localhost:3000/backend"
  }
};
