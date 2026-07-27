(() => {
  const data = window.CUBE_DATA || null;

  const menuButton = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    document.querySelectorAll(".nav a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("open"));
    });
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element && value) element.textContent = value;
  }

  if (data) {
    setText("hero-text", data.club?.heroText);
    setText("coach-name", data.coach?.name);
    setText("coach-role", data.coach?.role);
    setText("coach-text", data.coach?.text);
    setText("coach-phone", data.club?.phoneDisplay);
    setText("contact-phone", data.club?.phoneDisplay);
    setText("contact-address", data.club?.address);
    setText("contact-landmark", data.club?.landmark);

    const tournament = data.tournaments?.find(item => item.active) || data.tournaments?.[0];
    if (tournament) {
      setText("tournament-title", tournament.title);
      setText("tournament-description", tournament.description);
      setText("tournament-date", tournament.date);
      setText("tournament-registration", tournament.registration);
      setText("tournament-format", tournament.format);
      setText("tournament-price", tournament.price);
      setText("tournament-day", tournament.day);
      setText("tournament-month", tournament.month);
    }

    document.querySelectorAll(".phone-link").forEach(link => {
      if (data.club?.phoneRaw) link.href = `tel:+${data.club.phoneRaw}`;
    });
  }

  const form = document.getElementById("signup-form");
  const toast = document.querySelector(".toast");

  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const formData = new FormData(form);
      const phoneRaw = data?.club?.phoneRaw || "79279571999";
      const message = [
        "Здравствуйте! Хочу записать ребёнка на пробное занятие в CUBE.",
        `Имя: ${formData.get("name") || ""}`,
        `Телефон: ${formData.get("phone") || ""}`,
        `Возраст ребёнка: ${formData.get("age") || "не указан"}`
      ].join("\n");

      if (toast) {
        toast.textContent = "Открываю WhatsApp…";
        toast.classList.add("show");
      }

      setTimeout(() => {
        window.open(
          `https://wa.me/${phoneRaw}?text=${encodeURIComponent(message)}`,
          "_blank",
          "noopener,noreferrer"
        );
        if (toast) toast.classList.remove("show");
      }, 400);
    });
  }
})();