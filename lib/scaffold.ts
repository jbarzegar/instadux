import { createAction, handleActions } from 'redux-actions'
import { toPairs, isEmpty } from 'lodash'

import { asyncResolvers, commonResolvers, commonQualifiers } from './resolvers'
import {
  createAsyncResolvers,
  createDefaultReducers,
  convertToActionName,
} from './helpers'

import { LexiconEntry, Declaration } from './types'

let createReducerAction = (domain: string, qualifiers: any) => (
  acc: Object,
  d: string | Declaration,
) => {
  let create = (actionName: string): Function =>
    createAction(convertToActionName(domain, actionName))

  if (typeof d === 'object' && d.async) {
    let a = createAsyncResolvers([d.name], qualifiers).reduce(
      (obj: Object, x: string) => {
        obj[x] = create(x)
        return obj
      },
      {},
    )

    return { ...acc, ...a }
  }
  acc[d] = create(d)

  return acc
}

type ActionParams = {
  domain: string
  verbs: Array<string>
  resolvers: Object
  declarations: Array<Object>
  qualifiers: Array<string>
}
let makeActions = ({
  domain,
  verbs,
  resolvers = {},
  declarations = [],
  qualifiers = [],
}: ActionParams): Object =>
  [...verbs, ...declarations, ...Object.keys(resolvers)].reduce(
    createReducerAction(domain, qualifiers),
    {},
  )

let mapCustomReducer = (resolvers: Object, name: string) =>
  toPairs(resolvers).reduce((obj, [k, v]) => {
    obj[convertToActionName(name, k)] = v

    return obj
  }, {})

type ReducerParam = {
  name: string
  initialState: Object
  resolvers: Object
  actions: Object
}
let makeReducer = ({
  name,
  initialState = { loading: false, error: false },
  resolvers = {},
  actions,
}: ReducerParam): Object =>
  handleActions(
    {
      ...createDefaultReducers(actions),
      ...mapCustomReducer(resolvers, name),
    },
    initialState,
  )

type Acc = {
  actions: Object
  reducers: Object
}

type Options = {
  customQualifiers?: Array<string>
}
export default (
  lexicon: Array<Object>,
  { customQualifiers = [] }: Options = {},
) => {
  if (lexicon.length === 0) {
    console.error('You have no entries in your lexicon')
  }

  let qualifiers = isEmpty(customQualifiers)
    ? commonQualifiers
    : [...commonQualifiers, ...customQualifiers]

  return lexicon.reduce(
    (acc: Acc, d: LexiconEntry) => {
      let verbs = [
        ...commonResolvers,
        ...createAsyncResolvers(asyncResolvers, qualifiers),
      ]

      let actions = makeActions({
        ...lexicon,
        domain: d.name,
        resolvers: d.resolvers,
        declarations: d.declarations,
        qualifiers,
        verbs,
      })

      acc.actions[d.name] = actions
      // @ts-ignore
      acc.reducers[d.name] = makeReducer({ actions, ...d })
      return acc
    },
    { actions: {}, reducers: {} },
  )
}
