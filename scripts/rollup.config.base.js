import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import eslint from '@rollup/plugin-eslint'
import { babel } from '@rollup/plugin-babel'
import pluginTypescript from '@rollup/plugin-typescript'
// import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import { name, version, author } from '../package.json'

const pkgName = 'notyper'
const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the   MIT License.\n' +
  ' */'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${pkgName}.umd.js`,
      format: 'umd',
      name: pkgName,
      banner,
    },
    {
      file: `dist/${pkgName}.cjs.js`,
      format: 'cjs',
      name: pkgName,
      banner,
    },
    {
      file: `dist/${pkgName}.esm.js`,
      format: 'es',
      banner,
    },
  ],
  plugins: [
    pluginTypescript(),
    clear({
      targets: ['dist'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      preventAssignment: true,
    }),
    nodeResolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    eslint({
      throwOnError: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['js', 'ts'],
    }),
  ],
}
