// @flow
import crypto from 'crypto'
import prompts from 'prompts'
import fs from 'fs'
import { type Question } from './exports'

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

function chksm (algo, stream, msgDigest) {
  let sum
  switch (algo) {
    case 1: sum = crypto.createHash('sha256')
      break
    case 2: sum = crypto.createHash('sha512')
      break
    case 3: sum = crypto.createHash('sha1')
      break
    case 4: sum = crypto.createHash('md5')
      break
    default: break
  }

  stream.on('error',
    () => console.error('failed to open file: does not exist or' +
      ' cannot be opened'))
  stream.on('data', (data: Buffer) => sum.update(data, 'utf8'))
  stream.on('end', () => {
    let data = sum.digest(msgDigest)
    console.log(data)
    return data
  })
}

async function operate (responses) {
  let algo: string = responses['algo']
  let filename: string = responses['filename']
  let digest = responses['digest']

  let stream = fs.createReadStream(filename)

  chksm(algo, stream, digest)
}

module.exports = chksm
