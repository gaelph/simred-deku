import { connect, render } from '../src'
import { element } from 'deku'

describe('connect', function () {
  it('renders without crashing', function () {
    const testFunc = () => {
      const Component = {
        render: ({ props }) => {
          
          return <div>rendered</div>
        } 
      }

      const Container = connect(
        (state) => ({}),
        (actions) => ({})
      )(Component)

      render(<Container />, { subscribe: () => { } }, document.getElementById('body'))
    }

    expect(testFunc).not.toThrow()
  })
})