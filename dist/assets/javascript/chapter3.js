//var dom = {}
//    dom.body = document.querySelector('.body');
//
//if (dom.body.querySelector('.chapter6')) {
//  dom.map        = dom.body.querySelector('.scene6--background')
//  dom.cercles  = dom.body.querySelectorAll('.scene6--cercle')
//  
////mouse paralax
//  let paralax = ()=>
//  {
//    window.addEventListener('mousemove', (e)=>
//    {
//      let ratio_x = (Math.round((e.clientX * 100) / window.innerWidth)) - 50
//      let ratio_y = (Math.round((e.clientY * 100) / window.innerWidth)) - 50
//      dom.map.style.transform = 'translate(' + ratio_x * 0.1 + 'px, ' + ratio_y * 0.1 + 'px)'
//      dom.mcercles.style.transform = 'translate(' + ratio_x * -0.3 + 'px, ' + ratio_y * -0.3 + 'px)'
//    })
//  }
//  paralax()
//}