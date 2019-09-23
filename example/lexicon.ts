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
    name: "todos",
    initialState: {},
    resolvers: {
      makeTodoRed: (state, { payload }) => ({
        ...state,
        color: "red"
      })
    },
    qualifiers: [
      "screamAtTodos",
      { name: "screamBecauseOfTodos", prefixes: ["success", "failure"] }
    ]
  },

  {
    name: "count",
    initialState: 0
  }
];
