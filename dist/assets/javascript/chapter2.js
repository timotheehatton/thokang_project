var scene6_content = document.querySelectorAll('.scene6--content--div'),
scene6_title = document.querySelectorAll('.scene6--nav--title'),
testimony_buttons = document.querySelectorAll('div.testimony-button'),
testimony_content = document.querySelectorAll('div.card'),
testimony_close_btn = document.querySelectorAll('div.card a.close-card'),
testimony_card_content = document.querySelectorAll('div.card div.card-content');

console.log(testimony_card_content);

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
