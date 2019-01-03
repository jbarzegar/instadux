export type Declaration = {
  name: string
  async: boolean
}

export type LexiconEntry = {
  name: string
  resolvers: Object
  declarations: Array<string | Declaration>
}
