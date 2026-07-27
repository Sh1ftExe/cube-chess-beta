const siteData = window.CUBE_SITE_DATA;

function setText(id, value) {
  const element = document.getElementById(id);
  if (element && value !== undefined && value !== null) {
    element.textContent = value;
  }
}

function applySiteData() {
  if (!siteData) return;

  const heroTitle = document.getElementById("hero-title");
  if (heroTitle) {
    heroTitle.innerHTML =
      `${siteData.hero.titleBefore}<span>${siteData.hero.titleAccent}</span>`;
  }

  setText("hero-text", siteData.hero.text);
  setText("fact-age", siteData.hero.age);
  setText("fact-trial", siteData.hero.trialPrice);
  setText("fact-city", siteData.hero.city);
  setText("fact-address", siteData.hero.shortAddress);

  setText("tournament-title", siteData.tournament.title);
  setText("tournament-description", siteData.tournament.description);
  setText("tournament-date", siteData.tournament.date);
  setText("tournament-time", siteData.tournament.registrationTime);
  setText("tournament-format", siteData.tournament.format);
  setText("tournament-price", siteData.tournament.price);
  setText("poster-day", siteData.tournament.posterDay);
  setText("poster-month", siteData.tournament.posterMonth);
  setText("poster-city", siteData.tournament.posterCity);

  setText("coach-name", siteData.coach.name);
  setText("coach-role", siteData.coach.role);
  setText("coach-text", siteData.coach.description);

  setText("coach-phone", siteData.contacts.phoneDisplay);
  setText("contact-phone", siteData.contacts.phoneDisplay);
  setText("contact-address", siteData.contacts.address);
  setText("contact-landmark", siteData.contacts.landmark);

  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.href = `tel:+${siteData.contacts.phoneInternational}`;
  });
}

applySiteData();

const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector(".nav");

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(element => {
  revealObserver.observe(element);
});

const form = document.querySelector("#signup-form");
const toast = document.querySelector(".toast");

form.addEventListener("submit", event => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const age = String(data.get("age") || "не указан").trim();

  const message = [
    "Здравствуйте! Хочу записать ребёнка на пробное занятие в CUBE.",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Возраст ребёнка: ${age}`
  ].join("\n");

  toast.textContent = "Открываю готовое сообщение в WhatsApp…";
  toast.classList.add("is-visible");

  setTimeout(() => {
    const url = `https://wa.me/79279571999?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast.classList.remove("is-visible");
  }, 600);
});
