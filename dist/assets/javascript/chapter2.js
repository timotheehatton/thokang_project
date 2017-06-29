var scene6_content = document.querySelectorAll('.scene6--content--div'),
scene6_title = document.querySelectorAll('.scene6--nav--title');

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
