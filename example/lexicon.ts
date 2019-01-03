/* import { createLexicon } from 'instadux' */

/* Example of a resolver entry */

/* Breakdown:
Name - name of reducer block
initialState - initialState of the reducer block
resolvers - custom reducers SHOULD NOT BE USED FOR ASYNC ACTIONS
declarations - custom action creators that do nothing
*/

export default [
  {
    name: 'todos',
    initialState: {},
    resolvers: {
      makeTodoRed: (state, { payload }) => ({
        ...state,
        color: 'red',
      }),
    },
    declarations: [
      'screamAtTodos',
      { name: 'screamBecauseOfTodos', async: true },
    ],
  },

  {
    name: 'count',
    initialState: 0,
  },
]
