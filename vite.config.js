// prettier-ignore
export default {
  base: "./",
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "[hash].[name].[ext]",
      },
    },
  },
};
