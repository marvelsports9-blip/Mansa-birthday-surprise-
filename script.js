const screens=[...document.querySelectorAll('.screen')];
let audioCtx=null, musicOn=false, musicTimer=null;

function goTo(id){
  screens.forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  burst(8);
}
function answer(btn){
  document.querySelectorAll('.choices button').forEach(b=>b.disabled=true);
  btn.style.background='linear-gradient(135deg,#f0c6d9,#ddd0f5)';
  document.getElementById('taskHint').textContent='सही जवाब… क्योंकि तुम्हारी सबसे खास बात शायद ये सारी चीज़ें हैं। ✨';
  setTimeout(()=>goTo('creative'),1100);
}
function photoTap(btn){
  btn.animate([{transform:'scale(1)'},{transform:'scale(1.06)'},{transform:'scale(1)'}],{duration:500});
  document.getElementById('photoHint').textContent='Memory unlocked 💗 — अब आखिरी दो surprises बाकी हैं...';
  setTimeout(()=>goTo('krishna'),850);
}
function finishBirthday(){
  goTo('final'); burst(90);
}
function burst(n){
  for(let i=0;i<n;i++){
    const el=document.createElement('span');
    el.textContent=['✦','♡','✧','•','🌸'][Math.floor(Math.random()*5)];
    el.style.position='fixed';el.style.left=(50+(Math.random()-.5)*65)+'vw';el.style.top=(48+(Math.random()-.5)*20)+'vh';
    el.style.fontSize=(10+Math.random()*20)+'px';el.style.color=['#c86b98','#a98bd0','#e6a9bd','#9c7ab9'][Math.floor(Math.random()*4)];
    el.style.pointerEvents='none';el.style.zIndex=50;document.body.appendChild(el);
    el.animate([{transform:'scale(.3)',opacity:0},{transform:'scale(1.2)',opacity:1,offset:.2},{transform:`translate(${(Math.random()-.5)*180}px,${-60-Math.random()*240}px) rotate(${Math.random()*300}deg)`,opacity:0}],{duration:900+Math.random()*1000,easing:'ease-out'}).onfinish=()=>el.remove();
  }
}
function particles(){
  const box=document.getElementById('particles');
  for(let i=0;i<24;i++){
    const p=document.createElement('span');p.className='particle';
    p.textContent=['✦','·','♡','✧'][Math.floor(Math.random()*4)];
    p.style.left=Math.random()*100+'vw';p.style.animationDelay=(-Math.random()*7)+'s';p.style.animationDuration=(5+Math.random()*7)+'s';
    box.appendChild(p);
  }
}
function startMusic(){
  if(musicOn){ if(audioCtx) audioCtx.suspend(); musicOn=false; document.getElementById('musicBtn').textContent='♪'; return; }
  audioCtx=new (window.AudioContext||window.webkitAudioContext)();
  const notes=[261.63,329.63,392,523.25,392,329.63,293.66,349.23];
  let i=0;
  const play=()=>{
    if(!musicOn)return;
    const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
    osc.type='sine';osc.frequency.value=notes[i++%notes.length];
    gain.gain.setValueAtTime(.0001,audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.045,audioCtx.currentTime+.05);
    gain.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+.75);
    osc.connect(gain);gain.connect(audioCtx.destination);osc.start();osc.stop(audioCtx.currentTime+.8);
  };
  musicOn=true;document.getElementById('musicBtn').textContent='♫';
  play();musicTimer=setInterval(play,720);
}
document.getElementById('musicBtn').addEventListener('click',startMusic);
particles();
