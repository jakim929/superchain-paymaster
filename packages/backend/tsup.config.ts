/* eslint-disable no-console */
import { defineConfig } from 'tsup'

export default defineConfig({
  name: '@dapp-starter-with-backend/backend',
  entry: ['src/cmd/runService.ts', 'src/cmd/runWorker.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
})
