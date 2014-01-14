/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('io-slides generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('io-slides:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {

        this.name = 'John Doe';
        this.presentationName = 'Awesome presentation';
        
        var expected = [
            ['slide_config.js', /Awesome presentation/],
            'js/slide-deck.js',
            'README.md',
            'template.html',
            '.jshintrc',
            'package.json',
            '.jshintrc',
            '.editorconfig'
        ];

        helpers.mockPrompt(this.app, {
            'name': this.name,
            'presentationName': this.presentationName
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
