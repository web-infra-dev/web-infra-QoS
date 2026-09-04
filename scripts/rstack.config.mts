// Configuration guide: https://rstack.rs/config
import { define } from 'rstack';

define.lib({
  // Preserve the tsc output layout used by runners and benchmark plugins.
  bundle: false,
  format: 'cjs',
  syntax: 'es2019',
  dts: true,
  source: {
    entry: {
      index: ['src/**/*.ts', '!src/**/*.d.ts'],
    },
  },
});
