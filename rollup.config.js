import scss from 'rollup-plugin-scss';
import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
export default [
  {
    input: './index.ts',
    output: {
      file: './dist/index.js', 
      format: 'esm'
    },
    plugins: [
      scss({
        includes: ['/**/*.css', '/**/*.scss', '/**/*.sass'],
        fileName: 'style.css'
      }),
      babel({ exclude: 'node_modules/**' }),
      typescript()
    ]
  },
  // {
  //   input: './index.ts',
  //   plugins: [ dts()],
  //   output: [
  //     {
  //       file: './dist/index.d.ts',
  //       format: 'es'
  //     }
  //   ],
  // }
]