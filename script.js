const key = document.getElementById("key");
const lock = document.getElementById("lock");
const lockScreen = document.getElementById("lockScreen");
const scene = document.getElementById("scene");
const pages = document.querySelectorAll(".page");
const music = document.getElementById("music");

let dragging=false,offsetX=0,offsetY=0;

/* llave */
key.addEventListener("touchstart",e=>{
 dragging=true;
 let t=e.touches[0];
 offsetX=t.clientX-key.offsetLeft;
 offsetY=t.clientY-key.offsetTop;
});

document.addEventListener("touchmove",e=>{
 if(!dragging)return;
 let t=e.touches[0];
 key.style.left=(t.clientX-offsetX)+"px";
 key.style.top=(t.clientY-offsetY)+"px";

 let k=key.getBoundingClientRect();
 let l=lock.getBoundingClientRect();

 if(k.left<l.right&&k.right>l.left&&k.top<l.bottom&&k.bottom>l.top){
   openBook();
 }
});

document.addEventListener("touchend",()=>dragging=false);

function openBook(){
 lockScreen.classList.add("hidden");
 scene.classList.remove("hidden");
 music.play().catch(()=>{});
}

/* páginas */
let current=0;
let startX=0;

document.addEventListener("touchstart",e=>{
 startX=e.touches[0].clientX;
});

document.addEventListener("touchend",e=>{
 let endX=e.changedTouches[0].clientX;

 if(startX-endX>50){
  if(current<pages.length){
    pages[current].classList.add("flipped");
    current++;
  }
 }

 if(endX-startX>50){
  if(current>0){
    current--;
    pages[current].classList.remove("flipped");
  }
 }
});

function toggleMusic(){
 if(music.paused) music.play();
 else music.pause();
}
