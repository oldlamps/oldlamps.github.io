// --- PART 1: AMBIENT CANVAS BACKGROUND ---
const canvas = document.getElementById('ambientCanvas');
const ctx = canvas.getContext('2d');
let polygons = [];
const polygonCount = 10;
const colors = [
  'rgba(65, 105, 225, 0.2)',  // Royal Blue
  'rgba(147, 112, 219, 0.2)', // Medium Purple
  'rgba(255, 105, 180, 0.2)', // Hot Pink
  'rgba(30, 144, 255, 0.2)',  // Dodger Blue
  'rgba(173, 216, 230, 0.2)'  // Light Blue
];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Polygon {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sides = getRandomInt(3, 8);
    this.size = getRandomInt(100, 250);
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.rotation = Math.random() * Math.PI * 2;
    this.color = colors[getRandomInt(0, colors.length - 1)];
    this.opacity = 0;
    this.fadeInSpeed = 0.005;
    this.fadeOutSpeed = 0.002;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    const angleIncrement = (Math.PI * 2) / this.sides;
    ctx.moveTo(
        this.x + this.size * Math.cos(this.rotation),
        this.y + this.size * Math.sin(this.rotation)
    );
    for (let i = 1; i <= this.sides; i++) {
      const angle = this.rotation + i * angleIncrement;
      const x = this.x + this.size * Math.cos(angle);
      const y = this.y + this.size * Math.sin(angle);
      ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += 0.001;

    if (this.x < -this.size || this.x > canvas.width + this.size || this.y < -this.size || this.y > canvas.height + this.size) {
      this.opacity -= this.fadeOutSpeed;
      if (this.opacity <= 0) {
        this.reset();
      }
    } else if (this.opacity < 0.2) {
        this.opacity += this.fadeInSpeed;
    }
  }

  reset() {
    this.sides = getRandomInt(3, 8);
    this.size = getRandomInt(100, 250);
    this.rotation = Math.random() * Math.PI * 2;
    this.color = colors[getRandomInt(0, colors.length - 1)];
    this.opacity = 0;
    const startEdge = getRandomInt(0, 3);
    switch (startEdge) {
      case 0: this.x = getRandomInt(0, canvas.width); this.y = -this.size; break;
      case 1: this.x = canvas.width + this.size; this.y = getRandomInt(0, canvas.height); break;
      case 2: this.x = getRandomInt(0, canvas.width); this.y = canvas.height + this.size; break;
      case 3: this.x = -this.size; this.y = getRandomInt(0, canvas.height); break;
    }
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
  }
}

function initCanvasAnimation() {
  for (let i = 0; i < polygonCount; i++) {
    const x = getRandomInt(0, canvas.width);
    const y = getRandomInt(0, canvas.height);
    polygons.push(new Polygon(x, y));
  }
}

function animateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  polygons.forEach(polygon => {
    polygon.update();
    polygon.draw();
  });
  requestAnimationFrame(animateCanvas);
}

initCanvasAnimation();
animateCanvas();


document.addEventListener('DOMContentLoaded', function() {
    
    // --- Typewriter Effect ---
    const subtitleElement = document.getElementById('subtitle');
    const phrases = [
        "A hobbyist developer.",
        "Game designer",
        "Where's my coffee??",
        "Digital Nomad"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        if (!subtitleElement) return; // Exit if element not found
        const currentPhrase = phrases[phraseIndex];
        if (isDeleting) {
            subtitleElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            subtitleElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 75 : 150;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }
    
    type();

    // --- Scroll Animation for Project Cards ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        observer.observe(card);
    });

});