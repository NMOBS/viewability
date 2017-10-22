const checkDomOverlapping = (element, options) => {
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
        testElement = document.elementFromPoint(x, y)
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

const checkElementOnScreen = (element) => {
  // TODO: Function assumes that browser can only have offsets from top and left
  // For example developer console is breaking the rules
  let browserTopOffset = window.outerHeight - window.innerHeight
  let browserLeftOffset = window.outerWidth - window.innerWidth

  // Calculate the areas of browser which areas are off the screen
  let windowRightOffScreen  = (window.screenX + window.outerWidth) - screen.width
  if (windowRightOffScreen < 0) { windowRightOffScreen = 0 }
  let windowBottomOffScreen = (window.screenY + window.outerHeight) - screen.height
  if (windowBottomOffScreen < 0) { windowBottomOffScreen = 0 }
  let windowLeftOffScreen = 0
  if (window.screenX < (browserLeftOffset * -1)) { windowLeftOffScreen = Math.abs(window.screenX + browserLeftOffset) }
  let windowTopOffScreen = 0
  if (window.screenY < (browserTopOffset * -1)) { windowTopOffScreen = Math.abs(window.screenY + browserTopOffset) }

  const elementRect = element.getBoundingClientRect()
  // Calculate visible points of element top right bottom left
  let visibleTop = Math.max(elementRect.top, windowTopOffScreen)
  let visibleBottom = Math.max(window.innerHeight - elementRect.bottom, windowBottomOffScreen)
  let visibleLeft = Math.max(elementRect.left, windowLeftOffScreen)
  let visibleRight = Math.max(window.innerWidth - elementRect.right, windowRightOffScreen)
  // Calculate the visible area of element
  let visibleArea = (window.innerWidth - visibleRight - visibleLeft) * (window.innerHeight - visibleBottom - visibleTop)
  let elementArea = elementRect.width * elementRect.height

  return Math.max(0, (visibleArea / elementArea) * 100)
}

checkElementCssInvisibility = (element) => {
    let style = window.getComputedStyle(element, null)
    let visibility = style.getPropertyValue('visibility')
    let display = style.getPropertyValue('display')
    // Return true if visibility hidden or display none
    return (visibility == 'hidden' || display == 'none')
}
