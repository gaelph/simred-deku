const { createApp, element } = require('deku')
import * as Simred from 'simred'

let _renderTimer = null
let _lastRender = performance.now()
let _timeToRender = 1000

const onStateUpdate = (Component, render) => (state) => {
  const now = performance.now()
  /* istanbul ignore else */
  if (_lastRender - now < _timeToRender) {
    /* istanbul ignore if */
    if (_renderTimer) cancelAnimationFrame(_renderTimer)

    _renderTimer = requestAnimationFrame(() => {
      try {
        console.log('render after state update', Component)
        const before = performance.now()

        render( Component , {})

        _timeToRender = before - performance.now()
        _lastRender = now
      } catch (e) {
        /* istanbul ignore next */
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
  const renderer = createApp(rootElement, {})
  renderer( App, {})

  store.subscribe(onStateUpdate(App, renderer))
}