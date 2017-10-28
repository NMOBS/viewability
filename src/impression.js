import emitter from './emitter'

let impression = false

export default (callback) => {
  emitter.on('impression', result => {

    if (! impression & result.status) {
      impression = true
      callback(result)

      emitter.emit('stop')
    }

  })
}
