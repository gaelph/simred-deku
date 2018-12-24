import { connect, render } from '../src'
import { element } from 'deku'

describe('Render', function () {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    window.requestAnimationFrame.mockRestore();
  });

  it('renders without crashing', function () {
    expect.assertions(2)
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

      const subscribeFunction = (callback) => {
        // setTimeout(() => {
        callback = jest.fn(callback)
        callback({ value: 'state' })
        expect(callback).toHaveBeenCalled()
        // }, 1)
      }

      render(Container, { subscribe: subscribeFunction }, 'body')
    }

    expect(testFunc).not.toThrow()
  })
})