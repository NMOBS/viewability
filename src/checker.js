import emitter from './emitter'
import checkers from './checkers'

let listenerCount = 0
let supportedCheckers = {}
let unsupportedCheckers = {}

export default (element, options) => {
  options.is_video = options.is_video || false
  options.intervalTimer = options.is_video ? 100 : 200
  options.limit = options.limit || 10

  options.width = options.width || element.offsetWidth
  options.height = options.height || element.offsetHeight
  let area = options.width * options.height
  options.percantageCheck = (area > 242500) ? 30 : 50

  Object.keys(checkers.all).forEach(key => {
    let checker = checkers.all[key]
    if (checker.support()) {
      supportedCheckers[key] = checker
    }
    else {
      unsupportedCheckers[key] = checker
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

  const fireEmit = (status, results) => {
    if (status === true) {
      count++
    } else {
      count = 0
    }

    // Impression
    if (count >= options.limit) {
      emitter.emit('impression', { status: true, results: results })
    }

    emitter.emit('viewability', {
      status: status,
      results: results
    })
  }

  const interval = setInterval(() => {
    let results = {}
    let status = true

    let documentVisibility = checkers.documentVisibility.check(element, options)
    results["documentVisibility"] = documentVisibility

    // Document Visibility
    if (!documentVisibility ) { status = false }
    if (!status) { return fireEmit(status, results) }

    // CSS Visibility
    let cssVisibility = checkers.cssVisibility.check(element, options)
    results["cssVisibility"] = cssVisibility

    if (!cssVisibility ) { status = false }
    if (!status) { return fireEmit(status, results) }

    // Element On Screen
    let elementOnScreen = checkers.elementOnScreen.check(element, options)
    results["elementOnScreen"] = elementOnScreen

    if (results["elementOnScreen"] < options.percantageCheck) { status = false }
    if (!status) { return fireEmit(status, results) }


    // Element On Screen
    let domOverlapping = checkers.domOverlapping.check(element, options)
    results["domOverlapping"] = domOverlapping

    if (((results["elementOnScreen"] / 100) * (100 - results["domOverlapping"])) < options.percantageCheck) { status = false }

    return fireEmit(status, results)
  }, options.intervalTimer)

  // Stop checker
  emitter.on('stop', () => {
    if (listenerCount < 1) return;
    if (listenerCount === 1) {
      clearInterval(interval)
    }

    listenerCount -= 1
  })
}
