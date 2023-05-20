
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import license from 'rollup-plugin-license'
import packageJson from './package.json' assert { type: 'json' };
import path from 'path'
import { fileURLToPath } from 'url';
import css from "rollup-plugin-import-css";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { name, version, author, module } = packageJson
const isProduction = process.env.NODE_ENV === 'production'

const settings = {
  globals: {
  },
  sourcemap: true
}

export default {
  input: './src/index.js',
  output: [{
    file: module,
    ...settings,
    name: name,
    format: 'es',
    plugins: [
      isProduction && terser()
    ]
  }],
  external: [ ],
  plugins: [
    commonjs({}),
    resolve({
    }),
    css({
      minify: isProduction,
    }),
    license({
      banner: `
        @license
        ${name} v${version}
        Copyright 2022<%= moment().format('YYYY') > 2022 ? '-' + moment().format('YYYY') : null %> ${author}
        ${packageJson.license} License
      `,
      thirdParty: {
        output: path.join(__dirname, 'dist', 'dependencies.txt'),
        includePrivate: true, // Default is false.
      },

    })
  ]
}
