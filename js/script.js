/* NAV TAB LOGIC */

const tabs = document.querySelectorAll(".tab");
const indicator = document.querySelector(".tab-indicator");

function moveIndicator(tab){
  const rect = tab.getBoundingClientRect();
  const parentRect = tab.parentElement.getBoundingClientRect();

  indicator.style.width = rect.width + "px";
  indicator.style.left = (rect.left - parentRect.left) + "px";
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {

    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    moveIndicator(tab);

    const target = document.getElementById(tab.dataset.target);
    if(target){
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

window.addEventListener("load", () => {
  moveIndicator(document.querySelector(".tab.active"));
});

/* TYPING PREVIEW */

const nameText = "Aarav Sharma";
const roleText = "Product Designer";
const points = [
  "Led UI redesign increasing conversions by 42%",
  "Built scalable design system for SaaS platform",
  "Collaborated with cross-functional teams",
  "Optimized onboarding experience"
];

const nameEl = document.querySelector(".resume-name");
const roleEl = document.querySelector(".resume-role");
const pointsEl = document.querySelector(".resume-points");

function typeText(element, text, speed = 40, callback){
  let index = 0;
  const interval = setInterval(() => {
    element.textContent += text[index];
    index++;
    if(index === text.length){
      clearInterval(interval);
      if(callback) callback();
    }
  }, speed);
}
const toggle = document.querySelector(".toggle-switch");
const circle = document.querySelector(".toggle-circle");
const labels = document.querySelectorAll(".toggle-label");
const amounts = document.querySelectorAll(".amount");
const duration = document.querySelectorAll(".duration");

let yearly = false;

toggle.addEventListener("click", () => {
  yearly = !yearly;

  circle.style.left = yearly ? "30px" : "4px";

  labels.forEach((l, i) => {
    l.classList.toggle("active", (yearly && i === 1) || (!yearly && i === 0));
  });

  amounts.forEach(el => {
    el.textContent = yearly ? el.dataset.year : el.dataset.month;
  });

  duration.forEach(d => {
    d.textContent = yearly ? "/mo (billed yearly)" : "/mo";
  });
});
function typePoints(index = 0){
  if(index >= points.length) return;

  const li = document.createElement("li");
  pointsEl.appendChild(li);

  typeText(li, points[index], 25, () => {
    setTimeout(() => typePoints(index + 1), 300);
  });
}

window.onload = () => {
  typeText(nameEl, nameText, 50, () => {
    typeText(roleEl, roleText, 40, () => {
      typePoints();
    });
  });
};