declare module 'get-folder-size';

declare namespace NodeJS {
  export interface ProcessEnv {
    CASE_NAME?: string;
    WITH_CACHE?: string;
    CURRENT_INDEX?: string;
  }
}
