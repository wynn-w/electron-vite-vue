import { Plugin } from "vite";
import { build, Plugin as EsbuildPlugin } from "esbuild";

export function createEsbuildPlugin(options: {
  plugins: EsbuildPlugin[];
}): Plugin {
  return {
    name: "vite-plugin-esbuild",
    setup(_build) {
      const { plugins } = options;

      _build.onLoad({ filter: /\.ts?$/ }, async (args) => {
        const result = await build({
          entryPoints: [args.path],
          bundle: true,
          plugins,
          write: false,
          format: "esm",
        });

        return {
          contents: result.outputFiles[0].text,
          loader: "ts",
        };
      });
    },
  };
}
