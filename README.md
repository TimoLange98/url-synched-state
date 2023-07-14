# url-synched-state

A hook that can be used inside a react project to keep state synchronized with the url search params.

## Example
```
import React from 'react'
import useUrlSynchedState from 'url-synched-state'

type SomeState = {
  id: number
  name: string
}

const someState: SomeState = {
  id: 12345
  name: 'useUrlSynchedState'
}

const Component: React.FC = () => {
  const [state, setState] = useUrlSynchedState(someState)

  return (
    <input type="text" value={state.id} onChange={e => setState('id', e.target.value)} />
    <input type="text" value={state.name} onChange={e => setState('name', e.target.value)} />
  )
}
```
Given this example, the hook will initially create url params 'id' and 'name' with their respective values. In this case it will modify the url to look like: "http://{url}?id=12345&name=useUrlSynchedState"

When we update the state via the 'setState' function that the hook returns, the search params aswell as the state itself will get updated automatically.

If we initially have search params present, with the keys of 'id' or 'number', our state will get updated with their respective values.
