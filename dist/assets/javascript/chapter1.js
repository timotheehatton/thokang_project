var scene5_content = document.querySelectorAll('.scene5--content--div'),
scene5_title = document.querySelectorAll('.scene5--nav--title');

for (var i= 0; i < scene5_title.length; i++) {
  scene5_title[i].addEventListener('mouseover', function(e) {
    scene5_content[this.dataset.slide].classList.add('active-content');
    if (this.dataset.slide != 0)
      scene5_title[0].classList.remove('money-title');
      
    e.preventDefault();
  });
  scene5_title[i].addEventListener('mouseout', function(e) {
    e.preventDefault();
    
    if (this.dataset.slide != 0)
      scene5_title[0].classList.add('money-title');
    
    scene5_content[this.dataset.slide].classList.remove('active-content');
  });
}