/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  testRunner: 'command',
  commandRunner: {
    'command': 'npm run test:no:coverage',
  },
  mutate: ['packages/**/*.js', '!packages/**/*.test.js'],
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
};
