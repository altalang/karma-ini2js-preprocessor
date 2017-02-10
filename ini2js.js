var ini = require('ini'),
    util = require('util');

var TEMPLATE = '' +
    'window.__ini__ = window.__ini__ || {};\n' +
    'window.__ini__[\'%s\'] = %s;';

var createINI2JSPreprocessor = function(logger, basePath) {
    var log = logger.create('preprocessor.ini2js');

    return function(content, file, done) {
        log.debug('Processing "%s"', file.originalPath);

        var parsed = ini.parse(content);
        parsed = JSON.stringify(parsed);

        var filePath = file.originalPath.replace(basePath + '/', '');

        done(util.format(TEMPLATE, filePath, parsed));
    }
};

createINI2JSPreprocessor.$inject = ['logger', 'config.basePath'];

module.exports = {
    'preprocessor:ini2js': ['factory', createINI2JSPreprocessor]
};
