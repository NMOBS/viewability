import emitter from './emitter'
import checkers from './checkers'

let listenerCount = 0
let supportedCheckers = []
let unsupportedCheckers = []

export default (element, options) => {
  checkers.all.forEach(checker => {
    if (checker.support()) {
      supportedCheckers.push(checker)
    }
    else {
      unsupportedCheckers.push(checker)
    }
  })

  // Start checkers
  emitter.on('start', () => {
    if (listenerCount === 0) {
      start(supportedCheckers, element, options)
    }

    listenerCount += 1
  })
}

const start = (checkers, element, options) => {
  let count = 0

  const interval = setInterval(() => {

    let results = {}
    checkers.forEach(checker => {
      results[checker.name] = checker.check(element, options)
    })

    // Status calculation
    let status = false
    if (
      results.cssVisibility === true &&
      results.elementOnScreen > 50
    ) {
      status = true
    }

    if (status === true) {
      count++
    } else {
      count = 0
    }

    // Impression
    if (count >= options.limit) {
      emitter.emit('impression', { status: true })
    }

    emitter.emit('viewability', {
      status: status
    })

  }, options.interval)

  // Stop checker
  emitter.on('stop', () => {
    if (listenerCount === 1) {
      clearInterval(interval)
    }

    listenerCount -= 1
  })
}
