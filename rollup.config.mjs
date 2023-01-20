import resolve from '@rollup/plugin-node-resolve';
import withSolid from 'rollup-preset-solid';

export default withSolid({
  targets: ['esm', 'cjs'],
  input: 'src/index.tsx',
  plugins: [resolve()]
});
