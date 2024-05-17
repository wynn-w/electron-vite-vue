/**
 * @name: vite-plugin-alisa
 * @description: autofill path alisa if tsconfig has set
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin, UserConfig } from "vite";
// const vite = require("vite");
export default function tsconfigPathsPlugin(): Plugin {
  return {
    name: "vite-plugin-worker-build",
    // enforce: "pre",
    // config(config: UserConfig) {
    //   //   const tsconfigPath = path.resolve(process.cwd(), "tsconfig.json");
    //   //   const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));
    //   //   const paths: {
    //   //     [key: string]: [string];
    //   //   } = tsconfig.compilerOptions.paths || {};

    //   //   const alias = {};
    //   //   Object.entries(paths).forEach(([key, value]) => {
    //   //     const aliasKey = key.replace("/*", "");
    //   //     const aliasValue = path.resolve(
    //   //       process.cwd(),
    //   //       value[0].replace("/*", "")
    //   //     );
    //   //     alias[aliasKey] = aliasValue;
    //   //   });
    //   //   vite.mergeConfig({
    //   //     build: {
    //   //       input: "electron/worker/serialport.ts",
    //   //       output: {
    //   //         format: "cjs",
    //   //         inlineDynamicImports: true,
    //   //         // When Rollup builds code in `cjs` format, it will automatically split the code into multiple chunks, and use `require()` to load them,
    //   //         // and use `require()` to load other modules when `nodeIntegration: false` in the Main process Errors will occur.
    //   //         // So we need to configure Rollup not to split the code when building to ensure that it works correctly with `nodeIntegration: false`.
    //   //         // @see - https://github.com/vitejs/vite/blob/v5.0.9/packages/vite/src/node/build.ts#L608
    //   //         entryFileNames: `[name].${"js"}`,
    //   //         chunkFileNames: `[name].${"js"}`,
    //   //         assetFileNames: "[name].[ext]",
    //   //       },
    //   //     },
    //   //   });
    //   return {
    //     input: "electron/worker/serialport.ts",
    //     output: {
    //       format: "cjs",
    //       inlineDynamicImports: true,
    //       // When Rollup builds code in `cjs` format, it will automatically split the code into multiple chunks, and use `require()` to load them,
    //       // and use `require()` to load other modules when `nodeIntegration: false` in the Main process Errors will occur.
    //       // So we need to configure Rollup not to split the code when building to ensure that it works correctly with `nodeIntegration: false`.
    //       // @see - https://github.com/vitejs/vite/blob/v5.0.9/packages/vite/src/node/build.ts#L608
    //       entryFileNames: `[name].${"js"}`,
    //       chunkFileNames: `[name].${"js"}`,
    //       assetFileNames: "[name].[ext]",
    //     },
    //   };
    // },
    resolveId(source, importer) {
        // console.log(source)

      if (source.startsWith(".worker.ts")) {
        // 解析主线程中的 Worker 调用，提取文件路径
        const workerPath = source.match(/'.+\.worker\.ts'/)[1];
        // 返回文件路径，确保 Vite 能够正确解析它
        return workerPath;
      }
    },
    load(id) {
      if (id.endsWith(".worker.ts")) {
        console.log(`++++++++++++++++++++++++++`, id);
      }
    },
  };
}
