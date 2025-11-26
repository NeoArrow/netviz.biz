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



//titile particale load


/* BRAND PARTICLE / DUAL-COLOR DUST ANIMATION */
const canvas = document.getElementById("brand-particles");
const ctx = canvas.getContext("2d");
const brandText = document.querySelector(".brand");

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Floating particles array
let particles = [];
const particleCount = 200;

for (let i = 0; i < particleCount; i++) {
  const side = Math.random() < 0.5 ? "left" : "right";
  particles.push({
    x: side === "left" ? Math.random() * canvas.width / 2 : canvas.width / 2 + Math.random() * canvas.width / 2,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 1,
    alpha: Math.random() * 0.5,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    side: side
  });
}

// Draw floating particles
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.side === "left" ? `rgba(255,255,255,${p.alpha})` : `rgba(0,170,255,${p.alpha})`;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;
    p.alpha += (Math.random() - 0.5) * 0.02;

    if (p.alpha < 0) p.alpha = 0;
    if (p.alpha > 1) p.alpha = 1;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  });

  requestAnimationFrame(drawParticles);
}

// Page-load burst particles (dual color)
function brandBurst() {
  const burstParticles = [];
  const burstCount = 100;

  for (let i = 0; i < burstCount; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.random() * 3 + 2;
    const side = Math.random() < 0.5 ? "left" : "right";

    burstParticles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      radius: Math.random() * 2 + 1,
      alpha: 1,
      dx: Math.cos(angle) * speed,
      dy: Math.sin(angle) * speed,
      decay: Math.random() * 0.02 + 0.01,
      side: side
    });
  }

  function animateBurst() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    burstParticles.forEach(p => {
      if (p.alpha > 0) {
        alive = true;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.side === "left" ? `rgba(255,255,255,${p.alpha})` : `rgba(0,170,255,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.decay;
      }
    });

    if (alive) requestAnimationFrame(animateBurst);
    else {
      brandText.style.opacity = 1; // Show brand after burst
      drawParticles(); // Start floating particles
    }
  }

  animateBurst();
}

// Trigger on page load
window.addEventListener("load", brandBurst);