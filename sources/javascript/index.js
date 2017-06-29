var dom = {}
    dom.body = document.querySelector('body')

//chapter page
if (dom.body.querySelector('.scene')) {
  dom.chapter             = dom.body.querySelector('.chapter')
  dom.scene               = dom.body.querySelectorAll('.scene')
  dom.timeline_point      = dom.body.querySelectorAll('.nav--timeline--link')
  dom.timeline_bar        = dom.body.querySelector('.nav--timeline--bar--full')
  dom.btn_menu            = dom.body.querySelector('.nav--menu')
  dom.btn_menu_close      = dom.body.querySelector('.popin--close')
  dom.menu_popin          = dom.body.querySelector('.popin')
  dom.menu_sound          = dom.body.querySelector('.nav--sound')

  //slider dimensions
  var width_slider = ()=>
  {
    var window_width = window.innerWidth;
    for (var i = 0; i < dom.scene.length; i++)
    {
      dom.scene[i].style.width = window_width + 'px'
    }
    dom.chapter.style.width = window_width * dom.scene.length + 'px'
  }

  width_slider()
  window.addEventListener("resize", function(){
    width_slider()
  });

  //next scene function
  var current_scene = 0
  var chapter = 1

  var next_scene = ()=>
  {
    if (current_scene < dom.scene.length - 1)
    {
      sound('../assets/sounds/sound_scroll.mp3', 0.1)
      current_scene++
      dom.chapter.style.transform = "translateX(" + -current_scene * window.innerWidth + "px)"
      dom.scene[current_scene].classList.add('scene--active')
      dom.scene[current_scene-1].classList.remove('scene--active')
      dom.timeline_point[current_scene].classList.add('nav--timeline--link--active')
      dom.timeline_bar.style.transform = 'scaleX(' + ( 1 / (dom.scene.length-1) ) * current_scene + ')'
    }
    // else {
    //   chapter++
    //   current_scene = 0
    //   $.ajax({
    //       type: "GET",
    //       url: "./chapters/chapter" + chapter + ".html",
    //       processData: false,
    //       crossDomain: true,
    //       cache: true,
    //       success: function (result, responseData) { $("body").html(result); },
    //       error: function (responseData, textStatus, errorThrown) { alert('AJAX failed'); },
    //   });
    // }
  }

  //previous scene function
  var previous_scene = ()=>
  {
    if (current_scene > 0) {
      sound('../assets/sounds/sound_scroll.mp3', 0.1)
      dom.scene[current_scene].classList.remove('scene--active')
      dom.timeline_point[current_scene].classList.remove('nav--timeline--link--active')
      current_scene--
      dom.scene[current_scene].classList.add('scene--active')
      dom.chapter.style.transform = "translateX(" + -current_scene * window.innerWidth + "px)"
      dom.timeline_bar.style.transform = 'scaleX(' + ( 1 / (dom.scene.length-1) ) * current_scene + ')'
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
        sound('../assets/sounds/sound_scroll.mp3', 0.1)
        dom.scene[current_scene].classList.remove('scene--active')
        dom.timeline_point[current_scene].classList.remove('nav--timeline--link--active')
        current_scene--
        dom.chapter.style.transform = "translateX(" + -current_scene * window.innerWidth + "px)"
        dom.timeline_bar.style.transform = 'scaleX(' + (current_scene * dom.scene.length) / 20 + ')'
      }
      if (current_scene < i) {
        sound('../assets/sounds/sound_scroll.mp3', 0.1)
        current_scene++
        dom.chapter.style.transform = "translateX(" + -current_scene * window.innerWidth + "px)"
        dom.scene[current_scene].classList.add('scene--active')
        dom.timeline_point[current_scene].classList.add('nav--timeline--link--active')
        dom.timeline_bar.style.transform = 'scaleX(' + (current_scene * dom.scene.length) / 20 + ')'
      }
      e.preventDefault();
    })
  }

  dom.btn_menu.addEventListener('mouseover', (e)=>
  {
    sound('../assets/sounds/sound_button.mp3', 0.1)
  })
  dom.menu_sound.addEventListener('mouseover', (e)=>
  {
    sound('../assets/sounds/sound_button.mp3', 0.1)
  })

  //chapter menu sound('../assets/sounds/sound_scroll.mp3', 0.1)
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

  //scroll control Lethargy
}

//home page
if (dom.body.querySelector('.mainHeader')) {
  dom.main_header        = dom.body.querySelector('.mainHeader--content')
  dom.main_header_front  = dom.body.querySelector('.mainHeader--content--front')
  dom.main_header_btn    = dom.body.querySelector('.mainHeader--content--center--btn a')

  dom.main_header_btn.addEventListener('mouseenter', (e)=>
  {
    sound('../assets/sounds/gun_reload.mp3', 1)
  })

  dom.main_header_btn.addEventListener('click', (e)=>
  {
    sound('../assets/sounds/gun_shot.mp3', 1)
  })
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
function sound(src, volume){
  var sound = new Audio(src);
  sound.autoplay = true;
  sound.volume = volume;
}

// $(".ajax--btn").mouseover(function(){
//   sound('../assets/sounds/gun_reload.mp3');
// });
// $(".ajax--btn").on("click", function()
// {
//   sound('../assets/sounds/gun_shot.mp3');
// }
// //ajax transition
// $(document).ready(function()
// {
//   $(".ajax--btn").mouseover(function(){
//     sound('../assets/sounds/gun_reload.mp3');
//   });
//   $(".ajax--btn").on("click", function()
//   {
//     sound('../assets/sounds/gun_shot.mp3');
//     var urlPageName = $(this).attr("href");
//     $.ajax({
//         type: "GET",
//         url: "./" + urlPageName,
//         processData: false,
//         crossDomain: true,
//         cache: true,
//         success: function (result, responseData) { $("body").html(result); },
//         error: function (responseData, textStatus, errorThrown) { alert('AJAX failed'); },
//     });
//     return false;
//   });
// });
