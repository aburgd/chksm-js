"use strict";

var _results = _interopRequireDefault(require("@aburgd/results"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const good = {
  type: 'text',
  name: 'question',
  message: 'Am I a question?'
};
const bad = 'Am I not a question?'; // GOOD

const goodQuestion = {
  message: 'is this a good Question',
  bool: typeof good === 'object'
};
const goodHasType = {
  message: 'does this have property `type`',
  bool: good.hasOwnProperty('type') // BAD

};
const badQuestion = {
  message: 'is this a good Question',
  bool: typeof bad === 'object'
};
const badHasType = {
  message: 'does this have property `type`',
  bool: bad.hasOwnProperty('type')
};
(0, _results.default)('good', goodQuestion, goodHasType);
(0, _results.default)('bad', badQuestion, badHasType);