'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');



var IoSlidesGenerator = module.exports = function IoSlidesGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(IoSlidesGenerator, yeoman.generators.Base);

IoSlidesGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'name',
    message: 'Would you mind telling me your name?',
    default: 'Firstname Lastname'
  }, {
    name: 'presentationName',
    message: 'What\'s the base name of your presentation?',
    default: this._.slugify(this.appname)
  }, {
    type: 'confirm',
    name: 'isBlank',
    message: 'Would you like to start with a blank presentation?',
    default: false
  }];

  this.prompt(prompts, function (props) {
    this.name = props.name;
    this.presentationName = props.presentationName;
    this.isBlank = props.isBlank;
    this.presentationTitle = props.presentationTitle;
    this.presentationSubTitle = props.presentationSubTitle;

    cb();
  }.bind(this));
};

IoSlidesGenerator.prototype.app = function app() {
  this.directory('theme', 'theme');
  this.directory('js', 'js');
  this.directory('images', 'images');
  this.copy('_template.html', 'template.html');
  this.copy('favicon.ico', 'favicon.ico');
  this.copy('_slide_config.js', 'slide_config.js');

  this.copy('_README.md', 'README.md');
  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

IoSlidesGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
