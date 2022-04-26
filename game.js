let bum = 0;
let num = 0;
let timeleft = 20;
let count = 0;
let isPause = false;

const randomColor = () => {
    var s = "123456789abcdef";
    var color = "#";
    for (i = 0; i < 6; i++) {
      color += s[Math.floor(Math.random() * s.length)];
    }
    return color;
  }


  function clearBubbles(sect) {
    while (sect.firstChild) {
        sect.removeChild(sect.firstChild);
    }
  }
  
  
  

      function bubbles() {

          var height = window.innerHeight;
          var width = window.innerWidth;
          const sect = document.querySelector("section");
          const createDiv = document.createElement("div");
          var size = Math.floor(Math.random() * 60) + 80;
          createDiv.classList.add('anim');
          createDiv.style.width = size + "px";
          createDiv.style.height = size + "px";
          createDiv.style.border = "4px solid";
          createDiv.style.borderColor = randomColor();
          createDiv.style.left = Math.random() * innerWidth + "px";
          sect.appendChild(createDiv);

         
          createDiv.addEventListener("mouseover", waitLmao);

      }

      function startBuble(intervals, sect){
        
        let interval = setInterval(() => {
           
           if(num <= 30){
               bubbles();
                num+=1;
            }
         },400);
        intervals.push(interval);
      }

      function waitLmao(){
        this.remove();
        bum+=1;
        num--;
       
      
      }

      function writeScore(){
          let high = document.getElementById("score");
          let value = high.textContent;
          if(bum > value) high.innerHTML = bum;
        bum = 0;
        num = 0;
      }

      function findTop(element) {
        let rec = element.getBoundingClientRect();
        return rec.top + window.scrollY;
      } 


      function pauseGame(sect){
       
        var nodes = sect.getElementsByTagName("div");
            for(var i=0; i<nodes.length; i++) {
                
                nodes[i].removeEventListener("mouseover", waitLmao);
                // console.log(Math.ceil(findTop(nodes[i])));
                let size = Math.ceil(findTop(nodes[i]));
                nodes[i].classList.remove('anim');
                nodes[i].style.top =  size + "px";

            }
            isPause = true;
        
      }


      function resumeGame(sect){
    
        var nodes = sect.getElementsByTagName("div");
            for(var i=0; i<nodes.length; i++) {
             
                nodes[i].classList.add('anim');
                nodes[i].addEventListener("mouseover", waitLmao);
              
                

            }
            isPause = false;
      }
    

     

    function timerStart(intervalsT, intervals, timeleft){
     
        let downloadTimer = setInterval(function(){
            if(timeleft <= 0){
                clearInterval(downloadTimer);
                intervals.forEach(interval => {
                    clearInterval(interval);
                  })
                  intervalsT.forEach(interval => {
                    clearInterval(interval);
                  })
                  document.getElementById("progressBar").value = 0;
            clearBubbles(sect);
            writeScore();
            play.disabled = false;
            pause.disabled = false;
              }
              
        document.getElementById("progressBar").value = 20 - timeleft;
        timeleft --;
        count = timeleft;
       
        
        }, 1000);
        intervalsT.push(downloadTimer);
    }

     
    
 

    (function init(){

        const intervals = [];
        const intervalsT = [];
      
        const sect = document.getElementById('sect');
        const play = document.getElementById('play');
        const pause = document.getElementById('pause');
        const stop = document.getElementById('stop');
      
        pause.disabled = true;
        play.addEventListener('click', () => {
        

            if(isPause){
      
                timerStart(intervalsT, intervals, count);
                resumeGame(sect);
                startBuble(intervals, sect);
                play.disabled = true;
                pause.disabled = false;
            }
            else{
                 timerStart(intervalsT,intervals, timeleft);
                startBuble(intervals, sect);
                play.disabled = true;
                pause.disabled = false;
                }

           
        
        });
      
        pause.addEventListener('click', () => {
            intervals.forEach(interval => {
                clearInterval(interval);
              })
              intervalsT.forEach(interval => {
                clearInterval(interval);
              })
         pauseGame(sect);
         play.disabled = false;
         pause.disabled = true;
        
        });
      
        stop.addEventListener('click', () => {
            intervals.forEach(interval => {
                clearInterval(interval);
              })
              intervalsT.forEach(interval => {
                clearInterval(interval);
              })
              document.getElementById("progressBar").value = 0;
             clearBubbles(sect);
             writeScore();
              play.disabled = false;
              pause.disabled = false;
              timeleft=20;
              count = 0;
              isPause = false;
        })
      
      })();
      