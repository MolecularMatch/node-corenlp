'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dependencies = require('./simple/annotator/depparse/dependencies.json');

var _dependencies2 = _interopRequireDefault(_dependencies);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// preload for browserify
require('./simple/annotator/pos/en.json');
require('./simple/annotator/pos/es.json');
require('./simple/annotator/parse/en.json');
require('./simple/annotator/parse/es.json');

/**
 * @class
 * @classdesc Middleware that interfaces between the pipeline and the connector strategies
 */
class Service {
  /**
   * Create a Service
   * @param {ConnectorServer|ConnectorCli} connector
   * @param {('English'|'French'|'German'|'Spanish'|'Unspecified'|'Whitesapce')} [language]
   */
  constructor(connector, language = 'Unspecified') {
    this._connector = connector;
    this._language = language;
  }

  getAnnotationData(text, annotators, options = {}) {
    return this._connector.get({
      annotators,
      text,
      options,
      language: this._language.toLowerCase()
    });
  }

  getTokensRegexData(text, pattern, annotators, options = {}) {
    return this._connector.get({
      annotators,
      text,
      options: _extends({}, options, {
        'tokensregex.pattern': pattern
      }),
      language: this._language.toLowerCase(),
      utility: 'tokensregex'
    });
  }

  getSemgrexData(text, pattern, annotators, options = {}) {
    return this._connector.get({
      annotators,
      text,
      options: _extends({}, options, {
        'semgrex.pattern': pattern
      }),
      language: this._language.toLowerCase(),
      utility: 'semgrex'
    });
  }

  getTregexData(text, pattern, annotators, options = {}) {
    return this._connector.get({
      annotators,
      text,
      options: _extends({}, options, {
        'tregex.pattern': pattern
      }),
      language: this._language.toLowerCase(),
      utility: 'tregex'
    });
  }

  static getTokenPosInfo(pos, languageISO) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`./simple/annotator/pos/${languageISO}.json`).tagset[pos];
    } catch (err) {
      return undefined;
    }
  }

  static getSentenceParseInfo(group, languageISO) {
    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      return require(`./simple/annotator/parse/${languageISO}.json`).multiword[group];
    } catch (err) {
      return undefined;
    }
  }

  static getGovernorDepInfo(dep) {
    return _dependencies2.default.dependencies[dep];
  }
}

exports.default = Service;