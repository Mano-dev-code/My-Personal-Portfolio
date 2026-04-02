/* ── Custom Cursor + Trail ──────────────────────────── */
const cur = document.getElementById("cur");
const TC = ["#00d4ff", "#0099ff", "#ff006e", "#00ff88", "#ffaa00"];
const TS = ["circle", "ring", "diamond", "star"];
let lastT = 0;

document.addEventListener("mousemove", (e) => {
  cur.style.left = e.clientX + "px";
  cur.style.top = e.clientY + "px";

  const now = Date.now();
  if (now - lastT > 28) {
    spawnTrail(e.clientX, e.clientY);
    lastT = now;
  }
});

document.addEventListener("mousedown", () => cur.classList.add("click"));
document.addEventListener("mouseup", () => cur.classList.remove("click"));

document.addEventListener("click", (e) => {
  const r = document.createElement("div");
  r.className = "cursor-ripple";
  r.style.left = e.clientX + "px";
  r.style.top = e.clientY + "px";
  document.body.appendChild(r);
  setTimeout(() => r.remove(), 560);
});

function spawnTrail(x, y) {
  const shape = TS[Math.floor(Math.random() * TS.length)];
  const color = TC[Math.floor(Math.random() * TC.length)];
  const size = Math.random() * 13 + 5;
  const ox = (Math.random() - 0.5) * 22;
  const oy = (Math.random() - 0.5) * 22;
  const dur = Math.random() * 480 + 380;

  const el = document.createElement("div");
  el.className = "trail-p";
  el.style.left = x + ox + "px";
  el.style.top = y + oy + "px";
  el.style.animationDuration = dur + "ms";

  if (shape === "circle") {
    el.style.cssText += `width:${size}px;height:${size}px;background:${color};border-radius:50%;box-shadow:0 0 ${size}px ${color};`;
  } else if (shape === "ring") {
    el.style.cssText += `width:${size}px;height:${size}px;background:transparent;border:2px solid ${color};border-radius:50%;box-shadow:0 0 ${size / 2}px ${color};`;
  } else if (shape === "diamond") {
    el.style.cssText += `width:${size}px;height:${size}px;background:${color};transform:rotate(45deg);box-shadow:0 0 ${size}px ${color};`;
  } else {
    const s = size * 2;
    el.innerHTML = `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${color}"><polygon points="12,2 15,9 22,9 16.5,14 18.5,21 12,17 5.5,21 7.5,14 2,9 9,9"/></svg>`;
    el.style.cssText += `width:${s}px;height:${s}px;`;
  }

  document.body.appendChild(el);
  setTimeout(() => el.remove(), dur);
}

/* ── Scroll Animations ──────────────────────────────── */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add("on");
      } else {
        en.target.classList.remove("on");
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".fade-up,.slide-l,.slide-r")
  .forEach((el) => io.observe(el));

/* ── Smooth Scroll ──────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute("href"));
    if (t) t.scrollIntoView({ behavior: "smooth" });
  });
});

/* ── EmailJS Integration ────────────────────────────── */

// ✅ Initialize EmailJS
(function () {
  emailjs.init("G_KUE25bWn0Jx9dbE");
})();

// ✅ Status Message Box
const statusBox = document.getElementById("form-status");

// ✅ Show Message Function
function showMessage(message, type) {
  if (!statusBox) return;

  statusBox.textContent = message;
  statusBox.className = `form-status show ${type}`;

  setTimeout(() => {
    statusBox.classList.remove("show");
  }, 2500);
}

// ✅ Form Submission
const form = document.getElementById("contact-form");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const btn = form.querySelector("button");

    // 🔄 Loading state
    btn.disabled = true;
    btn.textContent = "Sending...";

    emailjs
      .sendForm("service_n1es9jo", "template_a5mlbd7", form)
      .then(
        () => {
          showMessage("Message sent successfully!", "success");
          form.reset();
        },
        (error) => {
          console.log("FAILED...", error);
          showMessage("Failed to send message", "error");
        },
      )
      .finally(() => {
        btn.disabled = false;
        btn.textContent = "Send Message";
      });
  });
}
