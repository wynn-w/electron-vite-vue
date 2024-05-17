/**
 * @name: vite-plugin-alisa
 * @description: autofill path alisa if tsconfig has set
 */
import fs from "node:fs";
import path from "node:path";
import type { Plugin, UserConfig } from "vite";

export default function tsconfigPathsPlugin(): Plugin {
  return {
    name: "vite-plugin-tsconfig-paths",
    enforce: 'pre',
    config(config: UserConfig) {
      const tsconfigPath = path.resolve(process.cwd(), "tsconfig.json");
      const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, "utf-8"));
      const paths: {
        [key: string]: [string];
      } = tsconfig.compilerOptions.paths || {};

      const alias = {};
      Object.entries(paths).forEach(([key, value]) => {
        const aliasKey = key.replace("/*", "");
        const aliasValue = path.resolve(
          process.cwd(),
          value[0].replace("/*", "")
        );
        alias[aliasKey] = aliasValue;
      });

      return {
        resolve: {
          alias: Object.assign(config?.resolve?.alias || {}, alias),
        },
      };
    },
  };
}
