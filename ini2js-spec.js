var expect = require('chai').expect,
    sinon = require('sinon');

describe('ini2js', function() {
    let ini2JSPreprocessor = require('./ini2js.js');
    let mod, newFile;

    beforeEach(function() {
        mod = ini2JSPreprocessor['preprocessor:ini2js'];
        newFile = function(path) {
            return {
                path: path,
                originalPath: path,
                contentPath: path,
                isUrl: false
            };
        }
    });

    it('module export should match Karma plugin API', function() {
        // test the basic API shape
        expect(mod).to.exist;
        expect(mod).to.be.an('array');
        expect(mod[0]).to.eql('factory');
        expect(mod[1]).to.be.a('function');

        // test that the correct values will be provided via dependency injection
        expect(mod[1].$inject).to.eql(['logger', 'config.basePath']);
    });

    describe('once initialized', function() {

        let logger, preprocess, window;

        beforeEach(function() {
            // require a window object to eval() content against
            window = {};

            logger = {};
            let create = sinon.spy();
            logger.create = create;

            let basePath = '/base';
            preprocess = mod[1](logger, basePath);
        });

        it('should process file', function() {

            let fileSpec = newFile('/base/path/widget.cfg');
            let content = '' +
                '[config]\n' +
                'debug = true\n' +
                'address = http://altalang.com/';

            preprocess(content, fileSpec, function(response) {
                expect(logger.create.called).to.be.true;

                expect(response).to.be.a('string');

                eval(response);

                expect(window.__ini__).to.exist;
                expect(Object.keys(window.__ini__).length).to.eql(1);
                expect(window.__ini__['path/widget.cfg']).to.exist;
                expect(window.__ini__['path/widget.cfg'].config).to.exist;
                expect(window.__ini__['path/widget.cfg'].config.debug).to.be.true;
                expect(window.__ini__['path/widget.cfg'].config.address).to.eql('http://altalang.com/');
            });
        });

    });
});
