export let commonResolvers = ['set', 'assign', 'remove', 'concat', 'filter']

/*
  Async resolvers will create a 2 extra action creators for fail and success

  EG: if you have the action `fetch` it will also create the actions `fetchSuccess` and `fetchFailure`

  so if you use it with thunk


  ```javascript
    dispatch(myReducer.fetch())

    fetch('myapi')
    .then(resp => {
      if (!resp.ok) { return reject(resp) }

      return resp.json()
    })
    .then(data => myReducer.fetchSuccess(data))
    .catch(err => myReducer.fetchFailure(err))

  ```
*/
export let asyncResolvers = ['fetch']

export let commonQualifiers = ['success', 'failure']
