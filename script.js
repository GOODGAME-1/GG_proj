// Presale 倒计时
const countdownEl = document.getElementById('countdown');
const target = new Date('2025-11-01T18:00:00Z').getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const diff = target - now;
  if (diff <= 0) { countdownEl.textContent = "🚀 Presale is Live!"; return; }
  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdownEl.textContent = `Presale starts in: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}
setInterval(updateCountdown,1000); updateCountdown();

// 自动更新年份
document.getElementById('year').textContent = new Date().getFullYear();

// 背景粒子动画
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particles = [];
for(let i=0;i<100;i++){
  particles.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*2+1,dx:(Math.random()-0.5)*0.5,dy:(Math.random()-0.5)*0.5});
}
function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle='rgba(0,191,255,0.7)';
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if(p.x<0||p.x>canvas.width)p.dx*=-1;
    if(p.y<0||p.y>canvas.height)p.dy*=-1;
  });
  requestAnimationFrame(animate);
}
animate();
window.addEventListener('resize',()=>{canvas.width=window.innerWidth;canvas.height=window.innerHeight;});
