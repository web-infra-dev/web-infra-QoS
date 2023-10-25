import { join } from 'path';

export const DEFAULT_RERUN_TIME = 5;
export const ROOT_PATH = join(__dirname, '..', '..', '..');
export const MODERN_PATH = join(ROOT_PATH, 'modern.js');
export const TEMP_PATH = join(ROOT_PATH, 'temp');
export const DATA_PATH = join(ROOT_PATH, 'data', 'modernjs-framework');
export const CASES_SRC_PATH = join(ROOT_PATH, 'cases', 'modernjs-framework');
export const CASES_DIST_PATH = join(MODERN_PATH, 'cases');
export const REMOTE_DATA_URL =
  'https://github.com/web-infra-dev/web-infra-QoS/raw/gh-pages/data';
