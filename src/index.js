// @flow
import crypto from 'crypto'
import prompts from 'prompts'
import fs from 'fs'

type Question = {
  type: string,
  name: string,
  message: string,
  style?: string,
  initial?: string|number,
  choices?: Array<{ title: string, value: string|number }>
}

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
  .then((responses) => operate(responses))
  .catch((error) => console.error(error))

async function ask (questions) {
  return prompts(questions)
}

async function operate (responses) {
  let algo: string = responses['algo']
  let filename: string = responses['filename']
  let digest = responses['digest']

  let stream = fs.createReadStream(filename)
  let hash

  switch (algo) {
    // block-scope for `let` variables
    case 1:
      hash = crypto.createHash('sha256')
      stream.on('data', (data: Buffer) => hash.update(data, 'utf8'))
      stream.on('end', () => {
        let data = hash.digest(digest)
        console.log(data)
        return data
      })
      break
    case 2:
      hash = crypto.createHash('sha512')
      stream.on('data', (data: Buffer) => hash.update(data, 'utf8'))
      stream.on('end', () => {
        let data = hash.digest(digest)
        console.log(data)
        return data
      })
      break
    case 3:
      hash = crypto.createHash('sha1')
      stream.on('data', (data: Buffer) => hash.update(data, 'utf8'))
      stream.on('end', () => {
        let data = hash.digest(digest)
        console.log(data)
        return data
      })
      break
    case 4:
      hash = crypto.createHash('md5')
      stream.on('data', (data: Buffer) => hash.update(data, 'utf8'))
      stream.on('end', () => {
        let data = hash.digest(digest)
        console.log(data)
        return data
      })
      break
    default:
      break
  }
}
