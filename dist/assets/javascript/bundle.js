(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var dom = {};
dom.body = document.querySelector('body');

//chapter page
if (dom.body.querySelector('.scene')) {
  dom.scene = dom.body.querySelectorAll('.scene');
  dom.timeline_point = dom.body.querySelectorAll('.nav--timeline--link');
  dom.timeline_bar = dom.body.querySelector('.nav--timeline--bar--full');
  dom.btn_menu = dom.body.querySelector('.nav--menu');
  dom.btn_menu_close = dom.body.querySelector('.popin--close');
  dom.menu_popin = dom.body.querySelector('.popin');

  //next scene function
  if (localStorage.getItem('current_chapter') == null) {
    localStorage.setItem('current_chapter', '1');
  }
  var current_chapter = localStorage.getItem('current_chapter');
  var current_scene = 0;

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
    } else if (current_chapter < 5) {
      current_chapter++;
      localStorage.setItem('current_chapter', current_chapter);
      $.ajax({
        type: "GET",
        url: "./chapters/chapter" + current_chapter + ".html",
        processData: false,
        crossDomain: true,
        cache: true,
        success: function success(result, responseData) {
          $("body").html(result);
        },
        error: function error(responseData, textStatus, errorThrown) {
          alert('AJAX failed');
        }
      });
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
    } else if (current_chapter > 1) {
      current_chapter--;
      localStorage.setItem('current_chapter', current_chapter);
      $.ajax({
        type: "GET",
        url: "./chapters/chapter" + current_chapter + ".html",
        processData: false,
        crossDomain: true,
        cache: true,
        success: function success(result, responseData) {
          $("body").html(result);
        },
        error: function error(responseData, textStatus, errorThrown) {
          alert('AJAX failed');
        }
      });
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

  //scroll control Lethargy
}

//home page
if (dom.body.querySelector('.mainHeader')) {
  dom.main_header = dom.body.querySelector('.mainHeader--content');
  dom.main_header_front = dom.body.querySelector('.mainHeader--content--front');

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
function sound(src) {
  var sound = new Audio(src);
  sound.autoplay = true;
}

//ajax transition
$(document).ready(function () {
  $(".ajax--btn").mouseover(function () {
    sound('../assets/sounds/gun_reload.mp3');
  });
  $(".ajax--btn").on("click", function () {
    sound('../assets/sounds/gun_shot.mp3');
    var urlPageName = $(this).attr("href");
    $.ajax({
      type: "GET",
      url: "./" + urlPageName,
      processData: false,
      crossDomain: true,
      cache: true,
      success: function success(result, responseData) {
        $("body").html(result);
      },
      error: function error(responseData, textStatus, errorThrown) {
        alert('AJAX failed');
      }
    });
    return false;
  });
});

},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
