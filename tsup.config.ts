import { defineConfig, type Options } from 'tsup'
import { bundleless } from 'tsup-plugin-bundleless'

const commonConfig = (option: Options): Options => {
  return {
    clean: false,
    sourcemap: !!option.watch,
    dts: true,
    minify: false,
    external: ['react', 'react-dom'],
    shims: true,
    treeshake: true,
    tsconfig: option.watch ? 'tsconfig.dev.json' : 'tsconfig.json',
  }
}

export const tsup = defineConfig((option) => [
  {
    ...commonConfig(option),
    entry: ['src/**/*.{ts,tsx}'],
    format: ['esm'],
    platform: 'browser',
    ...bundleless(),
  },
  {
    ...commonConfig(option),
    entry: ['src/index.ts'],
    format: ['cjs'],
    platform: 'node',
  },
])
