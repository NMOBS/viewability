export const name = 'elementOnScreen'

export const check = (element, options) => {
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

// @TODO
export const support = () => {
  return true
}
