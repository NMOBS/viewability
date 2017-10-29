import * as cssVisibility from './css-visibility'
import * as elementOnScreen from './element-on-screen'
import * as domOverlapping from './dom-overlapping'
import * as documentVisibility from './document-visibility'

export default {
  all: {
    "documentVisibility": documentVisibility,
    "cssVisibility":      cssVisibility,
    "elementOnScreen":    elementOnScreen,
    "domOverlapping":     domOverlapping
  }
}
