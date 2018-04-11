// @flow

export type Question = {
  type: string,
  name: string,
  message: string,
  style?: string,
  initial?: string|number,
  choices?: Array<{ title: string, value: string|number }>
}
