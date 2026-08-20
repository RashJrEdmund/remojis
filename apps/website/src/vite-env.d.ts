/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RELEASES_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
