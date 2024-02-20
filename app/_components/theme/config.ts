const TOGGLE_SVG_FRAMER_CONFIG = {
  initial: { scale: 0.5, opacity: 0 },
  animate: { scale: 1, opacity: 1, rotate: 360 },
  transition: { duration: 0.25 }
}

const TOGGLE_SVG_PROPS = {
  viewBox: '0 -960 960 960',
  height: '28',
  width: '28',
  xmlns: 'http://www.w3.org/2000/svg',
  className: 'icon'
}

const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 600,
  damping: 28
}

const TOGGLE_FRAMER_CONFIG = {
  layout: true,
  transition: SPRING_TRANSITION
}

export { TOGGLE_FRAMER_CONFIG, TOGGLE_SVG_FRAMER_CONFIG, TOGGLE_SVG_PROPS }
