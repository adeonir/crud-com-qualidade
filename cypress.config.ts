import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents() {},
  },
  video: false,
  screenshotOnRunFailure: false,
  defaultCommandTimeout: 10000,
})
