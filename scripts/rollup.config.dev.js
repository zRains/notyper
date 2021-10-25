import baseConfig from './rollup.config.base'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    serve({
      open: true,
      port: 8080,
      contentBase: ['dist', 'example'],
      openPage: '/index.html',
    }),
    livereload({
      watch: 'example/index.html',
    }),
  ],
}
