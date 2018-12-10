export const name = 'domOverlapping'

export const check = (element, options) => {
  options        = options        || {}
  options.offset = options.offset || 12

  const elementRect = element.getBoundingClientRect()

  const xLeft   = elementRect.left + options.offset
  const xCenter = Math.floor(elementRect.left + elementRect.width/2)
  const xRight  = elementRect.right - options.offset
  const yTop    = elementRect.top + options.offset
  const yCenter = Math.floor(elementRect.top + elementRect.height/2)
  const yBottom = elementRect.bottom - options.offset

  const testPoints = [
    { x:xLeft,   y:yTop },
    { x:xCenter, y:yTop },
    { x:xRight,  y:yTop },
    { x:xLeft,   y:yCenter },
    { x:xCenter, y:yCenter },
    { x:xRight,  y:yCenter },
    { x:xLeft,   y:yBottom },
    { x:xCenter, y:yBottom },
    { x:xRight,  y:yBottom }
  ]

  let overlappingArea
  let totalOverLappingArea = 0
  const calculateOverlappingArea = (elementRect, testElementRect) => {
    let elementArea = elementRect.width * elementRect.height
    let xOverlap = Math.max(0, Math.min(elementRect.right, testElementRect.right) - Math.max(elementRect.left, testElementRect.left))
    let yOverlap = Math.max(0, Math.min(elementRect.bottom, testElementRect.bottom) - Math.max(elementRect.top, testElementRect.top))
    return (xOverlap * yOverlap) / elementArea
  }

  let testedElements = []
  testPoints.forEach(({x, y}) => {
    // console.log('Testing: ', x, y)
    // TODO: Check x y are defined
    let testElement = options.window.document.elementFromPoint(x, y)
    // console.log('Found Element: ', testElement)
    // Return if the test element is null or element or contained by the element
    if (testElement == null || testElement == element || element.contains(testElement)) { return }
    // Return if I already test this element
    if (testedElements.indexOf(testElement) != -1) { return }
    testedElements.push(testElement)
    overlappingArea = calculateOverlappingArea(elementRect, testElement.getBoundingClientRect())
    // console.log('overlappingArea', overlappingArea)
    // Return if overlappingArea is equalt or lower then 0
    if (overlappingArea <= 0) { return }

    totalOverLappingArea += (overlappingArea * 100)
  })

  return totalOverLappingArea
}

// @TODO
export const support = () => {
  return true
}

