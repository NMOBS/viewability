import checker from './checker'
import impression from './impression'
import emitter from './emitter'

export const init = (element, options = {}) => {

  // Run checkers
  checker(element, options)

  return {

    on(callback) {
      emitter.on('viewability', result => callback(result, () => {
        emitter.emit('stop')
      }))

      emitter.emit('start')
    },

    impression(callback) {
      impression(callback)
      emitter.emit('start')
    }

  }

}
