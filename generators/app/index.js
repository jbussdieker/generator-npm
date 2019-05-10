'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('name', {
      type: String,
      required: true,
      default: this.appname,
      description: 'The package name'
    });
    this.option('version', {
      type: String,
      default: '0.0.0',
      description: 'The package version'
    });
    this.option('description', {
      type: String,
      default: '',
      description: 'The package description'
    });
    this.option('author', {
      type: String,
      default: '',
      description: 'The package author'
    });
    this.option('license', {
      type: String,
      default: 'MIT',
      description: 'The package license'
    });
    this.option('target', {
      type: String,
      required: false,
      default: 'package.json',
      description: 'Target filename to write the package config'
    });
  }

  writing() {
    const allowed = ['name', 'version', 'description', 'author', 'license'];
    const filtered = Object.keys(this.options)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        return {
          ...obj,
          [key]: this.options[key]
        };
      }, {});

    this.fs.writeJSON('package.json', filtered);
  }

  install() {
    this.installDependencies();
  }
};
