const pages = document.querySelectorAll(".page");
const music = document.getElementById("music");

let current = 0;
let startX = 0;

/* DESLIZAR REAL */
document.addEventListener("touchstart", e=>{
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e=>{
  let endX = e.changedTouches[0].clientX;

  // PASAR ADELANTE
  if(startX - endX > 50){
    if(current < pages.length){
      pages[current].classList.add("flipped");
      current++;
      playMusic();
    }
  }

  // VOLVER ATRÁS
  if(endX - startX > 50){
    if(current > 0){
      current--;
      pages[current].classList.remove("flipped");
    }
  }
});

/* MUSICA */
function playMusic(){
  music.play().catch(()=>{});
}

function toggleMusic(){
  if(music.paused) music.play();
  else music.pause();
}
