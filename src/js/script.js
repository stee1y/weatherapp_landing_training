const allLink = document.querySelectorAll('a[href*="#"]')

for(let link of allLink) {
  if (link.classList.contains('navigation__link') ||
      link.classList.contains('up') ||
      link.classList.contains('down') ||
      link.classList.contains('navigation-footer__link')) {
      link.addEventListener('click', evt => {
        evt.preventDefault()
        const idLink = link.getAttribute('href')
        document.querySelector(`${idLink}`).scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      link.classList.contains('navigation__link') ? openMenu() : false
    })
  }
}

const btnMenu = document.querySelector('.open-menu')
const overlay = document.querySelector('.navigation-wrapper')
const nav  = document.querySelector('.navigation')

const openMenu = function(evt) {
  btnMenu.classList.toggle('open-menu--active')
  overlay.classList.toggle('navigation-wrapper--active')
  nav.classList.toggle('toggle')
}

btnMenu.addEventListener('click', openMenu)

const up = document.querySelector('.up')
window.addEventListener('scroll', function() {
  if ( pageYOffset > 1000 ) {
    up.style.visibility='visible'
    up.style.opacity=1
  } else {
    up.style.visibility='hidden'
    up.style.opacity=0
  }
});

const slider = document.querySelector('.slider__list');

document.querySelector('.slider__left').addEventListener('click', e => {
  slider.childNodes[1].classList.remove('slider__item--active')
  slider.childNodes[2].classList.add('slider__item--active')
  slider.appendChild(slider.childNodes[0])
});

document.querySelector('.slider__right').addEventListener('click', e => {
  slider.insertBefore(slider.childNodes[2], slider.childNodes[0])
  slider.childNodes[2].classList.remove('slider__item--active')
  slider.childNodes[1].classList.add('slider__item--active')
});









