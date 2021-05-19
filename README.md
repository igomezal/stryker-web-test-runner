# Stryker used together with web-test-runner

This project can be used as an example of stryker being used together with web-test-runner.

The approach used is simple, it doesn't require any plugin to be able to use web-test-runner and stryker at the same time.

As no plugin is used it relies on the testRunner default value which is 'command' and it runs `npm run test:no:coverage`.

It executes the **wtr** command for each mutation to check if the test is still working or not, the reason why it is needed to not check the coverage on each iteration is due to **wtr** failing because the coverage threshold is not meet.

## How to use it

1. Clone the repository
2. Run `npm i`
3. Finally run `npm run test:mutation` (Be sure to use node version greater than 12.17.0 so wtr is able to load ESM)

## How does it work?

Stryker modifies the files marked to be mutated and it adds at the start of those files some checks to decide which mutation is being checked at that moment.

In each iteration Stryker runs these mutations and sets which mutations are being executed with an environment variable called `__STRYKER_ACTIVE_MUTANT__`:

```js
process.env.__STRYKER_ACTIVE_MUTANT__
```

On the other hand `web-test-runner` execute the tests in a browser so we have to inject that variable inside those tests before they are run.

To achieve it, we can use the `testRunnerHtml` option which can allow us to declare the HTML used to run the tests:

```js
function getCurrentMutant() {
  return process.env.__STRYKER_ACTIVE_MUTANT__;
}

export default {
  ...
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
```

If you are using **Stryker version 5** you will need to update the previous script, now the `__STRYKER_ACTIVE_MUTANT__` and `activeMutant` need to be of type string so make sure to double o single quote the expression `${getCurrentMutant()}`.

At the end the script which will be injected in the html page should look like this:

```js
  window.__stryker__ = window.__stryker__ || {};

  window.__stryker__.activeMutant = '${getCurrentMutant()}'; // Single quotes to be sure it is a string so it works with Stryker version 5

  window.process = {
      env: {
          __STRYKER_ACTIVE_MUTANT__: '${getCurrentMutant()}', // Single quotes to be sure it is a string so it works with Stryker version 5
      }
  }
```
