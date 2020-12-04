var input = document.querySelector('#input');
var submit = document.querySelector('#submit');
var box = document.querySelector('#box');
var detail = document.querySelector('#detail');
var detailBtn = document.querySelector('#detail-btn');
var Progress_Status = document.querySelector('#Progress_Status');

var Codestack = 'MaxT';
var Boost = "strong"
var width = 1; 
var identity;




// functions

function update() { 
  var element = document.getElementById("myprogressBar");    
  identity = setInterval(scene, 1000); 
  detail.style.display ="none";
  detailBtn.style.display ="none";
  Progress_Status.style.display ="block";


  function scene() { 
    if (width >= 100) { 
      width = 1;
      clearInterval(identity); 
    } else {
      
    if(width === 16){
       clearInterval(identity); 
      box.style.display ="block";
      Send();
    };
    
    if(width === 35){
      clearInterval(identity); 
      box.style.display ="block";
        bost()
    };
    
  if(width === 50){
      clearInterval(identity); 
       box.style.display ="block";
      Send();
    };

    width++;

      
        
      element.style.width = width + '%';  
      element.innerHTML = width + "%";
    } 
    // else clause ends
  } 
} 



 function Send(){

   submit.addEventListener('click', function(e){
         e.preventDefault();
    if(input.value === Codestack){
         box.style.display ="none";
       input.value = "";
      update();
    }else{
      alert("O.T.P is incorrect please check")
    console.log('failed again')
    }
    
    
    
 } )
 }
 
  function bost(){
   submit.addEventListener('click', function(e){
   e.preventDefault();
    if(input.value === Boost){
    box.style.display ="none";
       input.value ="";
      update();
    }else{
      alert("O.T.P is incorrect please check")
    console.log('failed again')
    }
    
    
 } )
 }

// animation
 const wrapperEl = document.querySelector('.wrapper');
    const numberOfEls = 90;
    const duration = 6000;
    const delay = duration / numberOfEls;

    let tl = anime.timeline({
      duration: delay,
      complete: function() { tl.restart(); }
    });

    function createEl(i) {
      let el = document.createElement('div');
      const rotate = (360 / numberOfEls) * i;
      const translateY = -50;
      const hue = Math.round(360 / numberOfEls * i);
      el.classList.add('el');
      el.style.backgroundColor = 'hsl(' + hue + ', 40%, 60%)';
      el.style.transform = 'rotate(' + rotate + 'deg) translateY(' + translateY + '%)';
      tl.add({
        begin: function() {
          anime({
            targets: el,
            backgroundColor: ['hsl(' + hue + ', 40%, 60%)', 'hsl(' + hue + ', 60%, 80%)'],
            rotate: [rotate + 'deg', rotate + 10 +'deg'],
            translateY: [translateY + '%', translateY + 10 + '%'],
            scale: [1, 1.25],
            easing: 'easeInOutSine',
            direction: 'alternate',
            duration: duration * .1
          });
        }
      });
      wrapperEl.appendChild(el);
    };

    for (let i = 0; i < numberOfEls; i++) createEl(i);