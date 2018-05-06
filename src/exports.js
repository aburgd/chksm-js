// @flow
import crypto from 'crypto'
import fs from 'fs'

type choiceArr = Array<{ title: string, value: string|number}>

export type Question = {
  type: string,
  name: string,
  message: string,
  style?: string,
  initial?: string|number,
  choices?: choiceArr
}

export function chksm (algo: string, filename: string, msgDigest: 'buffer') {
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

  let stream = fs.createReadStream(filename)

  stream.on('error',
    () => console.error('failed to open file: does not exist or' +
      ' cannot be opened'))
  stream.on('data', (data: Buffer) => sum.update(data, 'utf8'))
  stream.on('end', () => {
    let dig: Buffer = sum.digest(msgDigest)
    dig.toString()
    console.log(dig)
    return dig
  })
}
