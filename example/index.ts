import createState from '../lib/scaffold'
import lexicon from './lexicon'
import { createStore, combineReducers } from 'redux'

let { actions, reducers } = createState(lexicon, {
  customQualifiers: ['yo', 'memes', 'sweetboi'],
})

console.log('reducers', reducers)
console.log('actions', actions)

let reducer = combineReducers(reducers)
let store = createStore(reducer)

// @ts-ignore
window.actions = actions
// @ts-ignore
window.store = store
