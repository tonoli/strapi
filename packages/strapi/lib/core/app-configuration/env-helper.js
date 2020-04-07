'use strict';

const _ = require('lodash');

function env(key, defaultValue) {
  return _.has(process.env, key) ? process.env[key] : defaultValue;
}

const utils = {
  int(...args) {
    const value = env(...args);
    return parseInt(value, 10);
  },

  bool(...args) {
    const value = env(...args);
    return value === 'true';
  },

  float(...args) {
    const value = env(...args);
    return parseFloat(value);
  },

  json(key, val) {
    const value = env(key, val);
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error(`Imposibble to parse json environment variable ${key}: ${error.message}`);
    }
  },

  array(...args) {
    let value = env(...args);

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.substring(1, value.length - 1);
    }

    return value.split(',').map(v => {
      return _.trim(v, '" ');
    });
  },

  date(...args) {
    const value = env(...args);
    return new Date(value);
  },
};

Object.assign(env, utils);

module.exports = env;
