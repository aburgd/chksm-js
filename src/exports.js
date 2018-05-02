// @flow

type choiceArr = Array<{ title: string, value: string|number}>

export type Question = {
  type: string,
  name: string,
  message: string,
  style?: string,
  initial?: string|number,
  choices?: choiceArr
}
