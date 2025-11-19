// Header glass shrink on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

/* Loader fade */
const loader = document.getElementById('loader');
window.addEventListener('load', () => {
  // small delay so loader is visible briefly
  setTimeout(()=> {
    if(!loader) return;
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';
    setTimeout(()=> loader.remove(), 600);
  }, 500);
});



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






/* Intersection Observer for reveal */
const revealEls = document.querySelectorAll('.reveal');
const titleEls = document.querySelectorAll('.section-title');

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {threshold: 0.18});

revealEls.forEach(el => io.observe(el));
titleEls.forEach(el => io.observe(el));

/* Nav underline active on scroll */
const sections = Array.from(document.querySelectorAll('main section'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === ('#' + id));
    });
  });
}, {threshold: 0.45});

sections.forEach(s => sectionObserver.observe(s));

/* Smooth focus for keyboard users on buttons/links */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.documentElement.classList.add('using-keyboard');
  }
});
/* HERO BACKGROUND SLIDESHOW */
const heroBG = document.querySelector(".hero-bg");

const images = [
  "url('src/img/bg/1.webp)",
  "url('src/img/bg/4.webp')",
  "url('src/img/bg/5.webp')",
  "url('src/img/bg/6.webp')",
  "url('src/img/bg/7.webp')"
];

let current = 0;

function changeBackground() {
  heroBG.style.opacity = 0;

  setTimeout(() => {
    heroBG.style.backgroundImage = images[current];
    heroBG.style.opacity = 50;
    current = Math.floor(Math.random() * images.length); // randomized order

  }, 800);
}

changeBackground();
setInterval(changeBackground, 7000); // every 7 seconds





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
const particleCount = 60;

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
  const burstCount = 40;

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




/* BUTTON PARTICLE LEFT-TO-RIGHT EFFECT */
document.querySelectorAll('.btn').forEach(btn => {
  const canvas = btn.querySelector('.btn-particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationFrame;

  function resizeCanvas() {
    canvas.width = btn.offsetWidth;
    canvas.height = btn.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function createParticles() {
    particles = [];
    const count = 30; // number of particles
    for (let i = 0; i < count; i++) {
      particles.push({
        x: 0, // start at left edge
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: Math.random() * 3 + 1, // speed to the right
        dy: 0,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.01
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 255, 255, ${p.alpha})`; // neon cyan
      ctx.fill();

      p.x += p.dx;
      p.alpha -= p.decay;
    });

    // Remove faded particles
    particles = particles.filter(p => p.alpha > 0 && p.x < canvas.width);

    if (particles.length > 0) {
      animationFrame = requestAnimationFrame(animateParticles);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animationFrame);
    }
  }

  btn.addEventListener('mouseenter', () => {
    createParticles();
    animateParticles();
  });
});




//card hover disply content

const servicecard = document.getElementById('card');
const service_para = document.getElementById('sevicecontent');
const service_title = document.getElementById('servicetitle');

    servicecard.addEventListener('mouseover', () => {
        servicecard.style.borderLeft = '5px solid blue';
        service_para.style.display = 'block';
        servicecard.style.cursor = 'pointer';
        service_title.style.textShadow = '0px 0px 10px #ae00ff87';
        service_title.style.textAlign = 'center';
    });

    servicecard.addEventListener('mouseout', () => {
        service_para.style.display='none';
        servicecard.style.borderLeft = 'none';
        service_title.style.textShadow = 'none';
        service_title.style.textAlign = 'left';
        

    });