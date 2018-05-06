// @flow
import crypto from 'crypto'
import prompts from 'prompts'
import { chksm, type Question } from './exports'

const questions: Array<Question> = [
  {
    type: 'text',
    name: 'filename',
    message: 'Enter filepath to checksum',
    style: 'default',
    initial: ''
  },
  {
    type: 'select',
    name: 'algo',
    message: 'Select a checksum algorithm',
    choices: [

      {title: 'SHA256', value: 1},
      {title: 'SHA512', value: 2},
      {title: 'SHA1', value: 3},
      {title: 'MD5', value: 4}
    ],
    initial: 1
  },
  {
    type: 'select',
    name: 'digest',
    message: 'Select a digest format',
    choices: [
      {title: 'Hex', value: 'hex'},
      {title: 'Base64', value: 'base64'}
    ]
  }
]

ask(questions)
  .catch((error: any) => console.error(error))
  .then((responses: any) => operate(responses))
  .catch((error: any) => console.error(error))

async function ask (questions: Array<Question>) {
  return prompts(questions)
}

async function operate (responses) {
  let algo: string = responses['algo']
  let filename: string = responses['filename']
  let msgDigest: 'buffer' = responses['digest']

  chksm(algo, filename, msgDigest)
}
