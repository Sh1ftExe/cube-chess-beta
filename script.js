const data = window.CUBE_DATA;

const menuButton = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
document.querySelectorAll(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("hero-title").innerHTML = `Шахматы для детей <span>от 4 лет</span>`;
document.getElementById("hero-text").textContent = data.club.heroText;
document.getElementById("coach-name").textContent = data.coach.name;
document.getElementById("coach-role").textContent = data.coach.role;
document.getElementById("coach-text").textContent = data.coach.text;
document.getElementById("coach-phone").textContent = data.club.phoneDisplay;
document.getElementById("contact-phone").textContent = data.club.phoneDisplay;
document.getElementById("contact-address").textContent = data.club.address;
document.getElementById("contact-landmark").textContent = data.club.landmark;

document.querySelectorAll(".phone-link").forEach(link => {
  link.href = `tel:+${data.club.phoneRaw}`;
});

const benefitsGrid = document.getElementById("benefits-grid");
data.benefits.forEach(item => {
  benefitsGrid.insertAdjacentHTML("beforeend", `
    <article class="benefit reveal">
      <span class="benefit__icon">${item.icon}</span>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
    </article>`);
});

const programsGrid = document.getElementById("programs-grid");
data.programs.forEach((item, index) => {
  programsGrid.insertAdjacentHTML("beforeend", `
    <article class="program ${index === 1 ? "program--dark" : ""} reveal">
      <div class="program__top"><span>${item.number}</span><b>${item.icon}</b></div>
      <h3>${item.title}</h3>
      <p>${item.text}</p>
      <ul>${item.items.map(x => `<li>${x}</li>`).join("")}</ul>
      <a href="#signup">Записаться →</a>
    </article>`);
});

const tournamentsGrid = document.getElementById("tournaments-grid");
data.tournaments.filter(x => x.active).forEach(item => {
  tournamentsGrid.insertAdjacentHTML("beforeend", `
    <article class="tournament reveal">
      <div>
        <p class="eyebrow">Ближайший турнир</p>
        <h2>${item.title}</h2>
        <p class="tournament__intro">${item.description}</p>
        <div class="tournament__meta">
          <div><span>Дата</span><strong>${item.date}</strong></div>
          <div><span>Регистрация</span><strong>${item.registration}</strong></div>
          <div><span>Формат</span><strong>${item.format}</strong></div>
          <div><span>Взнос</span><strong>${item.price}</strong></div>
        </div>
        <a class="button button--secondary phone-link" href="tel:+${data.club.phoneRaw}">Узнать подробности</a>
      </div>
      <div class="tournament__poster">
        <small>CUBE CHESS</small>
        <strong>${item.day}</strong>
        <span>${item.month}</span>
        <b>♜</b>
      </div>
    </article>`);
});

const galleryGrid = document.getElementById("gallery-grid");
data.gallery.forEach(item => {
  galleryGrid.insertAdjacentHTML("beforeend", `
    <article class="gallery-card reveal">
      <b>${item.symbol}</b>
      <span>${item.title}</span>
    </article>`);
});

const reviewsGrid = document.getElementById("reviews-grid");
data.reviews.forEach(item => {
  reviewsGrid.insertAdjacentHTML("beforeend", `
    <article class="review reveal">
      <div class="review__stars">${"★".repeat(item.rating)}</div>
      <p>${item.text}</p>
      <strong>${item.name}</strong>
    </article>`);
});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const form = document.getElementById("signup-form");
const toast = document.querySelector(".toast");
form.addEventListener("submit", e => {
  e.preventDefault();
  const formData = new FormData(form);
  const message = [
    "Здравствуйте! Хочу записать ребёнка на пробное занятие в CUBE.",
    `Имя: ${formData.get("name")}`,
    `Телефон: ${formData.get("phone")}`,
    `Возраст ребёнка: ${formData.get("age") || "не указан"}`
  ].join("\n");
  toast.textContent = "Открываю WhatsApp…";
  toast.classList.add("show");
  setTimeout(() => {
    window.open(`https://wa.me/${data.club.phoneRaw}?text=${encodeURIComponent(message)}`, "_blank");
    toast.classList.remove("show");
  }, 500);
});