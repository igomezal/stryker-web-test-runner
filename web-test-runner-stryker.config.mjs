import defaultConfig from './web-test-runner.config.mjs';

function getCurrentMutant() {
  return process.env.__STRYKER_ACTIVE_MUTANT__;
}

export default {
  ...defaultConfig,
  coverage: false, // coverage must be set to false so stryker can be run (it could fail if mutatant test are able to survive)
  testRunnerHtml: testFramework =>
    `<html>
      <body>
        <script>
            window.__stryker__ = window.__stryker__ || {};

            window.__stryker__.activeMutant = ${getCurrentMutant()};

            window.process = {
                env: {
                    __STRYKER_ACTIVE_MUTANT__: ${getCurrentMutant()},
                }
            }
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`,
}