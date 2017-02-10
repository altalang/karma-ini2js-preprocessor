# karma-ini2js-preprocessor [![Build Status](https://travis-ci.org/altalang/karma-ini2js-preprocessor.svg?branch=master)](https://travis-ci.org/altalang/karma-ini2js-preprocessor)

> preprocessor for converting INI files to JS test fixtures

## Installation

The easiest way is to keep `karma-ini2js-preprocessor` as a devDependency in
your `package.json`.

```json
{
  "devDependencies": {
    "karma": "~0.10",
    "karma-ini2js-preprocessor": "~0.1"
  }
}
```

You can simple do it by:
```bash
npm install karma-ini2js-preprocessor --save-dev
```

## How does it work ?

This preprocessor converts INI files into JS objects and publishes them in the
global `window.__ini__` so that they may be used for tests.

ex: `config.ini`
```ini
[config]
debug = true
```

becomes

```javascript
window.__ini__['config.ini'] = {
    config: {
        debug: 'true'
    }
}
```


----

For more information on Karma see the [homepage].

[homepage]: http://karma-runner.github.com
