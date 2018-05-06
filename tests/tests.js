// @flow
import results, { type state } from '@aburgd/results'
import { type Question } from '../src/exports'

const good: Question = {
  type: 'text',
  name: 'question',
  message: 'Am I a question?'
}

const bad: string = 'Am I not a question?'
// GOOD
const goodQuestion: state = {
  message: 'is this a good Question',
  bool: typeof good === 'object'
}
const goodHasType: state = {
  message: 'does this have property `type`',
  bool: good.hasOwnProperty('type')
}
// BAD
const badQuestion: state = {
  message: 'is this a good Question',
  bool: typeof bad === 'object'
}
const badHasType: state = {
  message: 'does this have property `type`',
  bool: bad.hasOwnProperty('type')
}

results('good', goodQuestion, goodHasType)
results('bad', badQuestion, badHasType)
