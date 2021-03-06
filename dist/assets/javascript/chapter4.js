var testimony_buttons = document.querySelectorAll('div.testimony-button'),
testimony_content = document.querySelectorAll('div.card'),
testimony_close_btn = document.querySelectorAll('div.card a.close-card'),
testimony_card_content = document.querySelectorAll('div.card div.card-content');

// testimony buttons
for (let i= 0; i < testimony_buttons.length; i++) {
  testimony_buttons[i].addEventListener('click', function(e) {
    testimony_content[this.dataset.testimony].style.transform = 'scale(1)';
    testimony_card_content[this.dataset.testimony].style.opacity = '1';
    e.preventDefault();
  });
  testimony_close_btn[i].addEventListener('click', function(e) {
    testimony_content[this.dataset.testimony].style.transform = 'scale(0)';
    testimony_card_content[this.dataset.testimony].style.opacity = '0';
    e.preventDefault();
  });
}

if (document.querySelector('.chapter4')) {
  var dom = {}
      dom.body = document.querySelector('body')
      dom.scene = dom.body.querySelectorAll('.scene');
      dom.timeline_point = dom.body.querySelectorAll('.nav--timeline--link');
      dom.timeline_bar = dom.body.querySelector('.nav--timeline--bar--full');
      dom.btn_menu = dom.body.querySelector('.nav--menu');
      dom.btn_menu_close = dom.body.querySelector('.popin--close');
      dom.menu_popin = dom.body.querySelector('.popin');

  //next scene function
  var current_scene = 0;
  var chapter = 4;

  var next_scene = function next_scene() {
    if (current_scene < dom.scene.length - 1) {
      current_scene++;
      dom.scene[current_scene].style.display = "block";
      setTimeout(function () {
        dom.scene[current_scene].classList.add('scene--active');
        dom.timeline_point[current_scene].classList.add('nav--timeline--link--active');
        dom.timeline_bar.style.transform = 'scaleX(' + current_scene * dom.scene.length / 20 + ')';
        setTimeout(function () {
          dom.scene[current_scene - 1].style.display = "none";
        }, 300);
      }, 10);
    }
  };

  //previous scene function
  var previous_scene = function previous_scene() {
    if (current_scene > 0) {
      dom.scene[current_scene].classList.remove('scene--active');
      dom.timeline_point[current_scene].classList.remove('nav--timeline--link--active');
      current_scene--;
      dom.timeline_bar.style.transform = 'scaleX(' + current_scene * dom.scene.length / 20 + ')';
      setTimeout(function () {
        dom.scene[current_scene].style.display = "block";
        setTimeout(function () {
          dom.scene[current_scene + 1].style.display = "none";
        }, 300);
      }, 10);
    }
  };

  //key control
  document.addEventListener('keyup', function (e) {
    if (e.keyCode == 39) {
      next_scene();
      e.preventDefault();
    }
    if (e.keyCode == 37) {
      previous_scene();
      e.preventDefault();
    }
  });

  //click control

  var _loop = function _loop(i) {
    dom.timeline_point[i].addEventListener('click', function (e) {
      if (current_scene > i) {
        dom.scene[current_scene].classList.remove('scene--active');
        dom.timeline_point[current_scene].classList.remove('nav--timeline--link--active');
        current_scene = i;
        dom.scene[current_scene].classList.add('scene--active');
        dom.timeline_point[current_scene].classList.add('nav--timeline--link--active');
        dom.timeline_bar.style.transform = 'scaleX(' + current_scene * dom.scene.length / 20 + ')';
      }
      if (current_scene < i) {
        current_scene = i;
        dom.scene[current_scene].classList.add('scene--active');
        dom.timeline_point[current_scene].classList.add('nav--timeline--link--active');
        dom.timeline_bar.style.transform = 'scaleX(' + current_scene * dom.scene.length / 20 + ')';
      }
      e.preventDefault();
    });
  };

  for (var i = 0; i < dom.timeline_point.length; i++) {
    _loop(i);
  }

  //chapter menu
  dom.btn_menu.addEventListener('click', function (e) {
    dom.menu_popin.style.display = 'block';
    setTimeout(function () {
      dom.menu_popin.classList.add('popin--active');
    }, 10);
    e.preventDefault();
  });
  dom.btn_menu_close.addEventListener('click', function (e) {
    dom.menu_popin.classList.remove('popin--active');
    setTimeout(function () {
      dom.menu_popin.style.display = 'none';
    }, 300);
    e.preventDefault();
  });
}

//ajax transition
$(document).ready(function()
{
  $(".ajax--btn").on("click", function()
  {
    var urlPageName = $(this).attr("href");
    $.ajax({
        type: "GET",
        url: "./" + urlPageName,
        processData: false,
        crossDomain: true,
        cache: true,
        success: function (result, responseData) { $("body").html(result); },
        error: function (responseData, textStatus, errorThrown) { alert('AJAX failed'); },
    });
    return false;
  });
});
