export default {
  coverage: true,
  coverageConfig: {
    report: true,
    threshold: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  files: ['packages/**/test/*.test.js'],
  nodeResolve: true,
  rootDir: '../../',
}