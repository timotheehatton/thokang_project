var scene6_content = document.querySelectorAll('.scene6--content--div'),
scene6_title = document.querySelectorAll('.scene6--nav--title'),
testimony_buttons = document.querySelectorAll('div.testimony-button'),
testimony_content = document.querySelectorAll('div.card'),
testimony_close_btn = document.querySelectorAll('div.card a.close-card'),
testimony_card_content = document.querySelectorAll('div.card div.card-content'),
infos_btn = document.querySelectorAll('a.popup--btn'),
infos_close_btn = document.querySelectorAll('div.more-infos div.more-infos-container a.close-card'),
infos_container = document.querySelectorAll('div.more-infos'),
infos_content = document.querySelectorAll('div.more-infos div.more-infos-container'),
all_player_buttons = document.querySelectorAll('.sounds-btn'),
changing_player = document.querySelector('.player--changing'),
play_svg = document.querySelectorAll('.sounds-btn .svg-play'),
pause_svg = document.querySelectorAll('.sounds-btn .svg-pause'),
chapter_music = document.querySelector('.chapter--music'),
    //video player
    videos_buttons = document.querySelectorAll('.videos-btn'),
    chapter_videos = document.querySelectorAll('.video-chapter'),
    video_play_svg = document.querySelectorAll('.videos-btn .svg-play'),
  video_pause_svg = document.querySelectorAll('.videos-btn .svg-pause');
    

console.log(videos_buttons);
console.log(chapter_videos);
console.log(video_play_svg);
console.log(video_pause_svg);
var player_content = ['../assets/sounds/chapter2_part4_hitler.mp3', '../assets/sounds/chapter2_part4_human.mp3', '../assets/sounds/chapter2_part4_rape.mp3', '../assets/sounds/chapter2_part4_pope.mp3', '../assets/sounds/chapter2_part4_badoy.mp3', '../assets/sounds/chapter2_part4_san_jose.mp3', '../assets/sounds/chapter2_part4_fabiala.mp3', '../assets/sounds/chapter2_part4_querol.mp3'];

// video
for (let i= 0; i < videos_buttons.length; i++) {
  videos_buttons[i].addEventListener('click', function(e) {
    
    if(chapter_videos[this.dataset.videos].paused){
      video_play_svg[this.dataset.videos].style.display='none'; 
      video_pause_svg[this.dataset.videos].style.display='block'; 
      chapter_videos[this.dataset.videos].play();
      chapter_music.volume = 0.02;
    } else {
      chapter_videos[this.dataset.videos].pause();
      video_play_svg[this.dataset.videos].style.display='block'; 
      video_pause_svg[this.dataset.videos].style.display='none'; 
      chapter_music.volume = 1;
    }
    
    e.preventDefault();
  });
}

//audio testimony
for (let i= 0; i < all_player_buttons.length; i++) {
  all_player_buttons[i].addEventListener('click', function(e) {
    if(changing_player.paused){
      play_svg[this.dataset.player].style.display='none'; 
      pause_svg[this.dataset.player].style.display='block'; 
      changing_player.pause();
      changing_player.setAttribute('src',   player_content[this.dataset.player]);
      chapter_music.volume = 0.02;
      changing_player.play();
      changing_player.onended = function() {
        chapter_music.volume = 1;
      }
      
    } else {
      play_svg[this.dataset.player].style.display='block'; 
      pause_svg[this.dataset.player].style.display='none'; 
      changing_player.pause();
    }
  
    e.preventDefault();
  });
}


// slider
for (var i= 0; i < scene6_title.length; i++) {
  scene6_title[i].addEventListener('mouseover', function(e) {
    scene6_content[this.dataset.slide].classList.add('active-content');
    if (this.dataset.slide != 0)
      scene6_title[0].classList.remove('money-title');

    e.preventDefault();
  });
  scene6_title[i].addEventListener('mouseout', function(e) {
    e.preventDefault();

    if (this.dataset.slide != 0)
      scene6_title[0].classList.add('money-title');

    scene6_content[this.dataset.slide].classList.remove('active-content');
  });
}

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

//pop-up more infos
for (let i= 0; i < infos_btn.length; i++) {
  infos_btn[i].addEventListener('click', function(e) {
    infos_container[this.dataset.infos].style.transform = 'translateX(0vw)';
    // testimony_card_content[this.dataset.infos].style.opacity = '1';
    e.preventDefault();
  });
  infos_close_btn[i].addEventListener('click', function(e) {
    infos_container[this.dataset.infos].style.transform = 'translateX(40vw)';
    // testimony_card_content[this.dataset.testimony].style.opacity = '0';
    e.preventDefault();
  });
}
