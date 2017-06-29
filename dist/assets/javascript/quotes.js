var dom = {}
dom.body = document.querySelector('body')

//chapter page
if (dom.body.querySelector('.chapter2')) {
  dom.btn_quote_hitler = dom.body.querySelectorAll('.chapter2 .scene6 .player--video--btn');
  console.log(dom.btn_quote_hitler);
  //dom.quote = player.elements.container.querySelector('audio');

  //Sound design
  function quote(src) {
    var quote = new Audio(src);
  }

  dom.btn_quote_hitler.addEventListener('click', function(e){
    quote('../assets/sounds/chapter2_part4_hitler.mp3');
    quote.play;
    console.log('coucou');
  e.preventDefault();
  });
  // dom.btn_quote_hitler.addEventListener('click', (e){
  //   quote('../assets/sounds/chapter2_part4_hitler.mp3');
  //   quote.play;
  //   if(quote.paused){
  //     quote.play();
  //     //player.elements.toggle_play.setAttribute('src','images/pause.png');
  //   }
  //   else{
  //     quote.pause();
  //     //player.elements.toggle_play.setAttribute('src','images/play.png');
  //     e.preventDefault();
  //   }
  // });
}
