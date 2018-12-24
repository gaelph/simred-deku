const { element } = require('deku')

import * as Simred from 'simred'

/**
 * HOC to connect a component to the Simred store like react-redux does.  
 * The first `stateToProps` function receives the global state as argument
 * and returns them as props to pass to the component.   
 * The second `actionsToProps` function receives the actions as arguments
 * and returns them as props to pass to the component.  
 * @param {(state: Store.State, ownProps: *[]) => object} stateToProps 
 * @param {(object: object, ownProps: *[]) => object} actionsToProps
 * @returns {(element) => element}
 */
export const connect = (stateToProps, actionsToProps) => {
  return (Component) => {
    return Object.assign({}, Component, {
      render: ({ props, children }) => {
        children = children || []
        const state = Simred.getState()
        const actions = Simred.getActions()
        props = Object.assign(props, stateToProps(state, props), actionsToProps(actions, props))

        return <Component {...props}> {
          children
        } </Component >
      }
    })
  }
}