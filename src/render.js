const { createApp, element } = require('deku')
import * as Simred from 'simred'

let _renderTimer = null
let _lastRender = performance.now()
let _timeToRender = 1000

const onStateUpdate = (Component, render) => (state) => {
  const now = performance.now()
  if (_lastRender - now < _timeToRender) {
    if (_renderTimer) cancelAnimationFrame(_renderTimer)

    _renderTimer = requestAnimationFrame(() => {
      try {
        console.log('render after state update')
        const before = performance.now()

        render( <Component /> , {})

        _timeToRender = before - performance.now()
        _lastRender = now
      } catch (e) {
        console.error(e)
      }
    })
  }
}


/**
 * @name Renderer
 * @function
 * Renders the app and updates it when the Simred store is updated.  
 * For perfomance, the rendering only happens on requestAnimationFrame.
 * @param {element} App
 * @param {Simred.Store} store
 * @param {HTMLElement} rootElement
 */
export const render = (App, store, rootElement) => {
  console.log("Creating app")
  const render = createApp(document.querySelector(rootElement), {})
  render( <App /> , {})

  store.subscribe(onStateUpdate(App, render))
}