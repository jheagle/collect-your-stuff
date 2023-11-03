// Your local gulpfile.js
const {
  build,
  defaultCmd,
  partials,
  readme,
  testFull,
  testQuick,
  typescript,
  watchFull,
  watchTest
} = require('js-build-tools')

// Everything you export will be created as a gulp task.
// You can build your own tasks here as well by using some of the functions `js-build-tools/functions`.
// You can list your available tasks by running `gulp --tasks`.
exports.build = build
exports.default = defaultCmd
exports.readme = readme
exports.testFull = testFull
exports.testQuick = testQuick
exports.typescript = typescript
exports.watchFull = watchFull
exports.watchTest = watchTest
