# simred-deku [![NPM version](https://badge.fury.io/js/simred-deku.svg)](https://npmjs.org/package/simred-deku) [![Build Status](https://travis-ci.org/gaelph/simred-deku.svg?branch=master)](https://travis-ci.org/gaelph/simred-deku)

> Deku bindings for Simred
If you do know what Simred is, take a look at [the project's GitHub page](https://github.com/gaelph/simred).
If Deku is unknown to you, pay a visit to [its GitHub repo](https://github.com/anthonyshort/deku).

It works more like `react-redux` rather than using the context/dispatch parameters in deku.
However, I thought it would be better to only give access to the store to components that
actually require it, i.e. Container Components.

## Installation

```sh
$ npm install --save simred-deku
```

## Usage

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

## License

MIT © [Gaël PHILIPPE](https://github.com/gaelph)
