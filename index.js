const bodyClass = document.getElementsByTagName('body')[0].classList
const headerClass = document.getElementsByTagName('header')[0].classList
const languageSwitchClass = document.getElementsByClassName('language-switch')[0].classList
let mouseOver = false
let mouseOut = false

const collapseHeader = () => {
  if (!mouseOut && headerClass.contains('expanded-header')) {
    mouseOver = false
    mouseOut = true
    headerClass.add('collapsed-header')
    headerClass.remove('expanded-header')
    bodyClass.remove('dim')

    if (window.innerWidth <= 550) {
      languageSwitchClass.add('collapsed')
    }
  }
}

const expandHeader = () => {
  if (!mouseOver && headerClass.contains('collapsed-header')) {
    mouseOver = true
    mouseOut = false
    headerClass.add('expanded-header')
    headerClass.remove('collapsed-header')
    bodyClass.add('dim')
    if (window.innerWidth <= 550) {
      languageSwitchClass.remove('collapsed')
    }

    setTimeout(() => {
      mouseOver = false
    }, 1000)
  }
}

const keepHeaderOpenOnSmallScreens = () => {
  if (window.innerWidth <= 550) {
    expandHeader()
  }
}

const toggleTooltip = () => {
  const tooltipClass = document.getElementsByClassName('tooltip')[0].classList
  tooltipClass.contains('open') ? tooltipClass.remove('open') : tooltipClass.add('open')
}

const currentPositionIsCloseTo = (position) => {
  return Math.abs(window.pageYOffset - position) <= 30
}

const getScrollPosition = (element) => {
  let currentElement = element
  let scrollPosition = element.offsetTop
  
  if (window.pageYOffset <= 1) {
    return scrollPosition = 0
  }

  while (!currentElement.classList.contains('main-container')) {
    currentElement = currentElement.offsetParent
    scrollPosition += currentElement.offsetTop
  }
  
  return scrollPosition
}


/* This function will along with matchPosition() match the scroll position when changing
   language. matchPosition is called before document is fully loaded, in bottom of this file. */
const storeScrollPosition = () => {
  const previousPosition = window.sessionStorage.getItem("scrollPosition")

  if (currentPositionIsCloseTo(previousPosition)) {
    return
  }

  const htmlElements = document.getElementsByClassName('main-container')[0].querySelectorAll('h1, h2, h3, p, ul')
  const topMostElement = Object.values(htmlElements).find(elem => elem.getBoundingClientRect().bottom >= 0)
  const scrollPosition = getScrollPosition(topMostElement)

  window.sessionStorage.setItem("scrollPosition", scrollPosition)
}

const matchPosition = () => {
  const scrollPosition = parseInt(window.sessionStorage.getItem("scrollPosition"))
  
  if (scrollPosition >= 1) {
    headerClass.add('collapsed-header')
    languageSwitchClass.remove('top-position')
  }
  
  window.scrollTo({left: 0, top: scrollPosition, behavior: "auto" })
}

document.addEventListener("scroll", () => {
  if (window.scrollY >= 15) {
    headerClass.remove('expanded-header')
    headerClass.add('collapsed-header')
    bodyClass.remove('dim')
    languageSwitchClass.remove('top-position')
    languageSwitchClass.add('collapsed')
  }
  if (window.scrollY <= 1) {
    headerClass.remove('collapsed-header')
    headerClass.remove('expanded-header')
    languageSwitchClass.remove('collapsed')
    languageSwitchClass.add('top-position')
  } 
})

matchPosition()