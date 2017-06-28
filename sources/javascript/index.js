var dom = {}
    dom.body                = document.querySelector('body')

//chapter page
if (dom.body.querySelector('.scene')) {
  dom.scene               = dom.body.querySelectorAll('.scene')
  dom.timeline_point      = dom.body.querySelectorAll('.nav--timeline--link')
  dom.timeline_bar        = dom.body.querySelector('.nav--timeline--bar--full')
  dom.btn_menu            = dom.body.querySelector('.nav--menu')
  dom.btn_menu_close      = dom.body.querySelector('.popin--close')
  dom.menu_popin          = dom.body.querySelector('.popin')

  //next scene function
  var current_scene = 0

  var next_scene = ()=>
  {
    if (current_scene < dom.scene.length - 1)
    {
      current_scene++
      dom.scene[current_scene].style.display = "block"
      setTimeout( ()=>
      {
        dom.scene[current_scene].classList.add('scene--active')
        dom.timeline_point[current_scene].classList.add('nav--timeline--link--active')
        dom.timeline_bar.style.transform = 'scaleX(' + (current_scene * dom.scene.length) / 20 + ')'
        setTimeout( ()=>
        {
          dom.scene[current_scene - 1].style.display = "none"
        }, 300)
      }, 10)
    }
  }

  //previous scene function
  var previous_scene = ()=>
  {
    if (current_scene > 0) {
      dom.scene[current_scene].classList.remove('scene--active')
      dom.timeline_point[current_scene].classList.remove('nav--timeline--link--active')
      current_scene--
      dom.timeline_bar.style.transform = 'scaleX(' + (current_scene * dom.scene.length) / 20 + ')'
      setTimeout( ()=>
      {
        dom.scene[current_scene].style.display = "block"
        setTimeout( ()=>
        {
          dom.scene[current_scene + 1].style.display = "none"
        }, 300)
      }, 10)
    }
  }

  //key control
  document.addEventListener('keyup', (e)=>
  {
    if (e.keyCode == 39) {
      next_scene()
      e.preventDefault();
    }
    if (e.keyCode == 37) {
      previous_scene()
      e.preventDefault();
    }
  })

  //click control
  for (let i = 0; i < dom.timeline_point.length; i++) {
    dom.timeline_point[i].addEventListener('click', (e)=>
    {
      if (current_scene > i) {
        dom.scene[current_scene].classList.remove('scene--active');
        dom.timeline_point[current_scene].classList.remove('nav--timeline--link--active');
        current_scene = i
        dom.scene[current_scene].classList.add('scene--active');
        dom.timeline_point[current_scene].classList.add('nav--timeline--link--active');
        dom.timeline_bar.style.transform = 'scaleX(' + (current_scene * dom.scene.length) / 20 + ')'
      }
      if (current_scene < i) {
        current_scene = i
        dom.scene[current_scene].classList.add('scene--active');
        dom.timeline_point[current_scene].classList.add('nav--timeline--link--active');
        dom.timeline_bar.style.transform = 'scaleX(' + (current_scene * dom.scene.length) / 20 + ')'
      }
      e.preventDefault();
    })
  }

  //chapter menu
  dom.btn_menu.addEventListener('click', (e)=>
  {
    dom.menu_popin.style.display = 'block'
    setTimeout( ()=>
    {
      dom.menu_popin.classList.add('popin--active')
    }, 10)
    e.preventDefault();
  })
  dom.btn_menu_close.addEventListener('click', (e)=>
  {
    dom.menu_popin.classList.remove('popin--active')
    setTimeout( ()=>
    {
      dom.menu_popin.style.display = 'none'
    }, 300)
    e.preventDefault();
  })
}

//home page
if (dom.body.querySelector('.mainHeader')) {
  dom.main_header  = dom.body.querySelector('.mainHeader--content')
  dom.main_header_front  = dom.body.querySelector('.mainHeader--content--front')

  //mouse paralax
  let paralax = ()=>
  {
    window.addEventListener('mousemove', (e)=>
    {
      let ratio_x = (Math.round((e.clientX * 100) / window.innerWidth)) - 50
      let ratio_y = (Math.round((e.clientY * 100) / window.innerWidth)) - 50
      dom.main_header.style.transform = 'translate(' + ratio_x * 0.1 + 'px, ' + ratio_y * 0.1 + 'px)'
      dom.main_header_front.style.transform = 'translate(' + ratio_x * -0.3 + 'px, ' + ratio_y * -0.3 + 'px)'
    })
  }
  paralax()
}

//Sound design
function sound(src){
  var sound = new Audio(src);
  sound.autoplay = true;
}

//sound('../assets/sounds/test1.mp3')
