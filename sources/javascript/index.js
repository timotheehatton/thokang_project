var dom = {}
    dom.body         = document.querySelector('body')
    dom.content      = dom.body.querySelectorAll('.project--content')
    dom.link         = dom.body.querySelectorAll('.nav--link')
    dom.btn_open     = dom.body.querySelectorAll('.project--content--open')
    dom.btn_close    = dom.body.querySelectorAll('.project--content--close')
    dom.picture      = dom.body.querySelectorAll('.project--content--picture')
    dom.btn_arrow    = dom.body.querySelector('.project--nav')

var window_width

//window width
var cover = () =>
{
  window_width = window.innerWidth
}
cover()

window.addEventListener('resize', () =>
{
  cover()
})
