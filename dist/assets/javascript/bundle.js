(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var dom = {};
dom.body = document.querySelector('body');

//chapter page
if (dom.body.querySelector('.scene')) {
  dom.chapter = dom.body.querySelector('.chapter');
  dom.scene = dom.body.querySelectorAll('.scene');
  dom.timeline_point = dom.body.querySelectorAll('.nav--timeline--link');
  dom.timeline_bar = dom.body.querySelector('.nav--timeline--bar--full');
  dom.btn_menu = dom.body.querySelector('.nav--menu');
  dom.btn_menu_close = dom.body.querySelector('.popin--close');
  dom.menu_popin = dom.body.querySelector('.popin');
  dom.menu_sound = dom.body.querySelector('.nav--sound');

  //slider dimensions
  var width_slider = function width_slider() {
    var window_width = window.innerWidth;
    for (var i = 0; i < dom.scene.length; i++) {
      dom.scene[i].style.width = window_width + 'px';
    }
    dom.chapter.style.width = window_width * dom.scene.length + 'px';
  };

  width_slider();
  window.addEventListener("resize", function () {
    width_slider();
  });

  //next scene function
  var current_scene = 0;
  var chapter = 1;

  var next_scene = function next_scene() {
    if (current_scene < dom.scene.length - 1) {
      sound('../assets/sounds/sound_scroll.mp3', 0.1);
      current_scene++;
      dom.chapter.style.transform = "translateX(" + -current_scene * window.innerWidth + "px)";
      dom.scene[current_scene].classList.add('scene--active');
      dom.scene[current_scene - 1].classList.remove('scene--active');
      dom.timeline_point[current_scene].classList.add('nav--timeline--link--active');
      dom.timeline_bar.style.transform = 'scaleX(' + 1 / (dom.scene.length - 1) * current_scene + ')';
    } else {
      var path = document.location.href;
      var file_name = path.substring(path.lastIndexOf("/") + 1);
      var chapter_current = file_name.replace(/[^\d]/g, "");
      chapter_current = parseInt(chapter_current) + 1;
      if (chapter_current < 5) {
        document.location.href = "http://localhost:3000/chapters/chapter" + chapter_current + ".html";
      }
    }
  };

  //previous scene function
  var previous_scene = function previous_scene() {
    if (current_scene > 0) {
      sound('../assets/sounds/sound_scroll.mp3', 0.1);
      dom.scene[current_scene].classList.remove('scene--active');
      dom.timeline_point[current_scene].classList.remove('nav--timeline--link--active');
      current_scene--;
      dom.scene[current_scene].classList.add('scene--active');
      dom.chapter.style.transform = "translateX(" + -current_scene * window.innerWidth + "px)";
      dom.timeline_bar.style.transform = 'scaleX(' + 1 / (dom.scene.length - 1) * current_scene + ')';
    } else {
      var path = document.location.href;
      var file_name = path.substring(path.lastIndexOf("/") + 1);
      var chapter_current = file_name.replace(/[^\d]/g, "");
      chapter_current = parseInt(chapter_current) - 1;
      if (chapter_current > 0) {
        document.location.href = "http://localhost:3000/chapters/chapter" + chapter_current + ".html";
      }
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
        sound('../assets/sounds/sound_scroll.mp3', 0.1);
        dom.scene[current_scene].classList.remove('scene--active');
        dom.timeline_point[current_scene].classList.remove('nav--timeline--link--active');
        current_scene--;
        dom.chapter.style.transform = "translateX(" + -current_scene * window.innerWidth + "px)";
        dom.timeline_bar.style.transform = 'scaleX(' + current_scene * dom.scene.length / 20 + ')';
      }
      if (current_scene < i) {
        sound('../assets/sounds/sound_scroll.mp3', 0.1);
        current_scene++;
        dom.chapter.style.transform = "translateX(" + -current_scene * window.innerWidth + "px)";
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

  dom.btn_menu.addEventListener('mouseover', function (e) {
    sound('../assets/sounds/sound_button.mp3', 0.1);
  });
  dom.menu_sound.addEventListener('mouseover', function (e) {
    sound('../assets/sounds/sound_button.mp3', 0.1);
  });

  //chapter menu sound('../assets/sounds/sound_scroll.mp3', 0.1)
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

  //scroll control Lethargy
}

//home page
if (dom.body.querySelector('.mainHeader')) {
  dom.main = dom.body.querySelector('.mainHeader');
  dom.main_header = dom.body.querySelector('.mainHeader--content');
  dom.main_header_front = dom.body.querySelector('.mainHeader--content--front');
  dom.main_header_btn = dom.body.querySelector('.mainHeader--content--center--btn a');
  dom.intro_video = dom.body.querySelector('.intro--video');
  dom.intro_skip = dom.body.querySelector('.intro--skip');

  dom.main_header_btn.addEventListener('mouseenter', function (e) {
    sound('../assets/sounds/gun_reload.mp3', 1);
  });

  dom.intro_skip.addEventListener('click', function (e) {
    document.location.href = "http://localhost:3000/chapters/chapter1.html";
  });

  dom.main_header_btn.addEventListener('click', function (e) {
    dom.main.style.opacity = "0";
    setTimeout(function () {
      dom.main.style.display = "none";
    }, 600);
    dom.intro_video.play();
    sound('../assets/sounds/gun_shot.mp3', 1);
  });

  dom.intro_video.onended = function () {
    document.location.href = "http://localhost:3000/chapters/chapter1.html";
  };

  //mouse paralax
  var paralax = function paralax() {
    window.addEventListener('mousemove', function (e) {
      var ratio_x = Math.round(e.clientX * 100 / window.innerWidth) - 50;
      var ratio_y = Math.round(e.clientY * 100 / window.innerWidth) - 50;
      dom.main_header.style.transform = 'translate(' + ratio_x * 0.1 + 'px, ' + ratio_y * 0.1 + 'px)';
      dom.main_header_front.style.transform = 'translate(' + ratio_x * -0.3 + 'px, ' + ratio_y * -0.3 + 'px)';
    });
  };
  paralax();
}

//Sound design
function sound(src, volume) {
  var sound = new Audio(src);
  sound.autoplay = true;
  sound.volume = volume;
}

//lethargy scroll
function addEvent(el, eventType, handler) {
  if (el.addEventListener) {
    el.addEventListener(eventType, handler, false);
  } else if (el.attachEvent) {
    el.attachEvent('on' + eventType, handler);
  } else {
    el['on' + eventType] = handler;
  }
};

(function () {
  var lethargy = new Lethargy();

  var scrolling = true;
  var checkScroll = function checkScroll(e) {
    if (scrolling === true) {
      scrolling = false;
      e.preventDefault();
      e.stopPropagation();

      var result = lethargy.check(e);
      if (result == -1) {
        next_scene();
      } else if (result == 1) {
        previous_scene();
      }
      setTimeout(function () {
        scrolling = true;
      }, 1500);
    }
  };

  // Cross-browser way to bind to mouse events
  addEvent(window, 'mousewheel', checkScroll);
  addEvent(window, 'DOMMouseScroll', checkScroll);
  addEvent(window, 'wheel', checkScroll);
  addEvent(window, 'MozMousePixelScroll', checkScroll);
})();

},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
