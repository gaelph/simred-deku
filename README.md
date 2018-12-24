# simred-deku [![NPM version](https://badge.fury.io/js/simred-deku.svg)](https://npmjs.org/package/simred-deku) [![Build Status](https://travis-ci.org/gaelph/simred-deku.svg?branch=master)](https://travis-ci.org/gaelph/simred-deku)

> Deku bindings for Simred
If you do know what Simred is, take a look at [the project's GitHub page](https://github.com/gaelph/simred).
If Deku is unknown to you, pay a visit to [its GitHub repo](https://github.com/anthonyshort/deku).

It works more like `react-redux` rather than using the context/dispatch parameters in deku.
However, I thought it would be better to only give access to the store to components that
actually require it, i.e. Container Components.

> **Note to React users**
> Deku doesn't require the use of a `<Provider/>` Component.
> The simple use of the `connect()` and the custom `render()` functions will suffice. 

## Installation

```sh
$ npm install --save simred-deku
```

## Usage

### Implementing a Container Component
```js
import { connect } from 'simred-deku'
import { Component } from './component'

const mapStateToProps = (state, ownProps) => {
  const { todos, filter} = state

  return { todos }
}

const mapActionsToProps = (actions, ownProps) => {
  const { add } = actions.todos

  return { addTodo: add}
}

export const Container = connect(
  mapSateToProps,
  mapActionsToProps,
)(Component)
```

### Passing the Store to the app
```js
import Simred from 'simred'
import { rootReducer } from './reducers'

import { element } from 'deku'
import { render } from 'simred-deku'
import { App } from './components'

const store = Simred.createStore(rootReducer)

render( <App />, store, document.getElementById('root'))
```

## License

MIT © [Gaël PHILIPPE](https://github.com/gaelph)
