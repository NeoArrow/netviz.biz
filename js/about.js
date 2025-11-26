/* CURSOR TRAIL PARTICLES (isolated variables) */
const trailCanvas = document.getElementById('cursorTrail');
const trailCtx = trailCanvas.getContext('2d');

function resizeTrailCanvas() {
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
}
resizeTrailCanvas();
window.addEventListener('resize', resizeTrailCanvas);

const trailParticles = [];
const trailMax = 150; // max particles on screen
let trailMouse = { x: window.innerWidth/2, y: window.innerHeight/2 };

// Track mouse movement
window.addEventListener('mousemove', event => {
  trailMouse.x = event.clientX;
  trailMouse.y = event.clientY;

  for (let i = 0; i < 3; i++) { // more particles per move
    trailParticles.push({
      posX: trailMouse.x,
      posY: trailMouse.y,
      radius: Math.random() * 2 + 1,
      velX: (Math.random() - 0.5) * 1.5,
      velY: (Math.random() - 0.5) * 1.5,
      alpha: 1,
      decay: Math.random() * 0.03 + 0.02
    });
  }
});

// Animate cursor trail
function animateCursorTrail() {
  trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

  trailParticles.forEach((p, index) => {
    trailCtx.beginPath();
    trailCtx.arc(p.posX, p.posY, p.radius, 0, Math.PI * 2);
    trailCtx.fillStyle = `rgba(0, 170, 255, ${p.alpha})`; // neon blue
    trailCtx.fill();

    // Update position
    p.posX += p.velX;
    p.posY += p.velY;
    p.alpha -= p.decay;

    // Remove faded particles
    if (p.alpha <= 0) trailParticles.splice(index, 1);
  });

  requestAnimationFrame(animateCursorTrail);
}

animateCursorTrail();


//scrolling animtion

const sections = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("active");
    }
  });
},{
  threshold:0.15   // 15% visible triggers animation
});

sections.forEach(sec => observer.observe(sec));

