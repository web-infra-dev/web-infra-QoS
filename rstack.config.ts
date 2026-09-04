// Configuration guide: https://rstack.rs/config
import { define } from 'rstack';

define.fmt({
  singleQuote: true,
  trailingComma: 'all',
  arrowParens: 'avoid',
  sortPackageJson: true,
  // Keep benchmark fixtures and installed skills unchanged.
  ignorePatterns: ['cases/**', '.agents/**'],
});

define.staged({
  // A commit may contain only ignored benchmark fixtures or installed skills.
  '*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}': ['rs lint', 'rs fmt'],
  '*.{json,md,mdx,css,scss,less,html,yml,yaml}': 'rs fmt',
});

define.lint(({ js, ts }) => [
  { ignores: ['cases/**', '.agents/**'] },
  js.configs.recommended,
  ts.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: ['./scripts/tsconfig.json', './website/tsconfig.json'],
      },
    },
  },
  {
    files: ['scripts/src/**/*.ts', 'website/src/**/*.{ts,tsx}'],
    // Benchmark adapters and chart data support multiple upstream API versions.
    rules: { '@typescript-eslint/no-explicit-any': 'off' },
  },
  {
    files: ['scripts/src/runners/yarn-install.ts'],
    // Keep the existing lazy CommonJS import of the Yarn lockfile parser.
    rules: { '@typescript-eslint/no-require-imports': 'off' },
  },
]);
