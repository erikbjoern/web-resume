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
    languageSwitchClass.add('collapsed')
  }
}

const expandHeader = () => {
  if (!mouseOver && headerClass.contains('collapsed-header')) {
    mouseOver = true
    mouseOut = false
    headerClass.add('expanded-header')
    headerClass.remove('collapsed-header')
    bodyClass.add('dim')
    languageSwitchClass.remove('collapsed')

    setTimeout(() => {
      mouseOver = false
    }, 1000)
  }
}

const keepHeaderOpenOnSmallScreens = () => {
  if (window.innerWidth <= 520) {
    expandHeader()
  }
}

const storeScrollPosition = () => {
  window.sessionStorage.setItem("scrollPosition", window.pageYOffset)
}

const matchPosition = () => {
  const scrollPosition = parseInt(window.sessionStorage.getItem("scrollPosition"))
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
