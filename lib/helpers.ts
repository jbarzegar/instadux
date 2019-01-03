import { camelCase, omit } from 'lodash'

type Payload = {
  payload: any
}

/* All keys should be strings */
type Actions = {
  [key: string]: string
}

export let convertToActionName = (domain: string, action: string) =>
  `${domain}_${action.toUpperCase()}`

export let createAsyncResolvers = (
  resolvers: Array<string> = [],
  qualifiers: Array<string> = [],
): Array<string> =>
  resolvers.reduce(
    (acc, d) => [...acc, d, ...qualifiers.map(x => camelCase(`${d} ${x}`))],
    [],
  )

let defaultAsyncReducers = (actions: Actions) => ({
  [actions.fetch]: (state: Object, { payload = {} }) => ({
    ...state,
    ...payload,
    loading: true,
  }),
  [actions.fetchSuccess]: (state: Object, { payload }: Payload) => ({
    loading: false,
    error: false,
    ...payload,
  }),
  [actions.fetchFailure]: (state: Object, { payload }: Payload) => ({
    ...state,
    loading: false,
    error: payload,
  }),
})

export let createDefaultReducers = (actions: Actions) => ({
  ...defaultAsyncReducers(actions),
  [actions.set]: (state: Object, { payload }: Payload) => payload,
  [actions.assign]: (state: Object, { payload }: Payload) => ({
    ...state,
    ...payload,
  }),
  [actions.remove]: (state: Object, { payload }: Payload) =>
    omit(state, payload),
  [actions.concat]: (state: Array<any>, { payload }: Payload) =>
    state.concat(payload),
})
