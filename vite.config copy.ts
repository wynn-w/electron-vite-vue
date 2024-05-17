import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron/simple";
import pkg from "./package.json";
import aliasPlugin from "./script/plugin/alisa";
import workerBuild from "./script/plugin/workerBuild";
import typescript from "@rollup/plugin-typescript";
import esbuildPluginTsc from "esbuild-plugin-tsc";
import { swcPlugin } from "./script/plugin/vite-plugin-swc";
// import babel from "@rollup/plugin-babel";
// import { alias } from '@rollup/plugin-alias';
// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  fs.rmSync("dist-electron", { recursive: true, force: true });
  const esmodule = pkg.type === "module";
  const isServe = command === "serve";
  const isBuild = command === "build";
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG;
  return {
    plugins: [
      // workerBuild(),
      // tsconfigPaths(),
      // typescript({
      //   tsconfig: "./tsconfig.json",
      //   experimentalDecorators: true,
      //   emitDecoratorMetadata: true,
      // }),
      vue(),
      electron({
        main: {
          // Shortcut of `build.lib.entry`
          entry: [
            "electron/main/index.ts",
            "electron/worker/serialport.worker.ts",
            "electron/worker/hid.worker.ts",
          ],
          onstart({ startup }) {
            if (process.env.VSCODE_DEBUG) {
              console.log(
                /* For `.vscode/.debug.script.mjs` */ "[startup] Electron App"
              );
            } else {
              startup();
            }
          },
          vite: {
            build: {
              sourcemap,
              minify: isBuild,
              outDir: "dist-electron/main",
              rollupOptions: {
                // Some third-party Node.js libraries may not be built correctly by Vite, especially `C/C++` addons,
                // we can use `external` to exclude them to ensure they work correctly.
                // Others need to put them in `dependencies` to ensure they are collected into `app.asar` after the app is built.
                // Of course, this is not absolute, just this way is relatively simple. :)
                external: Object.keys(
                  "dependencies" in pkg ? pkg.dependencies : {}
                ),
              },
            },
          },
        },
        preload: {
          // Shortcut of `build.rollupOptions.input`.
          // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
          input: "electron/preload/index.ts",
          vite: {
            build: {
              sourcemap: sourcemap ? "inline" : undefined, // #332
              minify: isBuild,
              outDir: "dist-electron/preload",
              rollupOptions: {
                external: Object.keys(
                  "dependencies" in pkg ? pkg.dependencies : {}
                ),
              },
            },
          },
        },
        // Ployfill the Electron and Node.js API for Renderer process.
        // If you want use Node.js in Renderer process, the `nodeIntegration` needs to be enabled in the Main process.
        // See 👉 https://github.com/electron-vite/vite-plugin-electron-renderer
        renderer: {},
      }),
      aliasPlugin(),
      // swcPlugin(),
      // esbuildPluginTsc({
      //   tsconfigPath: path.join(__dirname, "tsconfig.json"),
      // }),
      // babel({
      //   // babelHelpers: "bundled", // 显式配置 babelHelpers 选项  'bundled' 或 'runtime'
      //   plugins: [
      //     // ['@babel/plugin-proposal-decorators', { legacy: true }],
      //     // ['@babel/plugin-proposal-class-properties'],
      //     "@babel/plugin-transform-private-methods", // 需要使用私有属性或者方法 解开
      //   ],
      // }),
    ],
    server:
      process.env.VSCODE_DEBUG &&
      (() => {
        const url = new URL(pkg.debug.env.VITE_DEV_SERVER_URL);
        return {
          host: url.hostname,
          port: +url.port,
        };
      })(),
    clearScreen: false,
    // esbuild: {
    //   // include: /\.js$/, // 只让 esbuild 处理 .js 文件
    //   // plugin: [
    //   // ],
    // },
    // optimizeDeps: {
    //   esbuildOptions: {
    //     loader: {
    //       ".ts": "ts", // 让 esbuild 加载 .ts 文件，但不处理编译
    //     },
    //   },
    // },
    // build: {
    //   rollupOptions: {
    //     input: {
    //       main: "./demo/main.ts",
    //       another: "./src/another_entry.ts",
    //     },
    //     output: 'demo/demo.js'
    //   },
    // },
  };
});
function tsconfigPaths(): import("vite").PluginOption {
  throw new Error("Function not implemented.");
}
