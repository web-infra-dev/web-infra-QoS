import { join } from 'path';

export const ROOT_PATH = join(__dirname, '..', '..', '..');
export const MODERN_PATH = join(ROOT_PATH, 'modern.js');
export const METRICS_PATH = join(ROOT_PATH, 'metrics');
export const CASES_SRC_PATH = join(ROOT_PATH, 'cases');
export const CASES_DIST_PATH = join(MODERN_PATH, 'cases');
