document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      const isOpen = navMenu.classList.contains("open");
      menuToggle.setAttribute("aria-expanded", isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. ScrollSpy (Active Navigation Highlighting)
  const sections = document.querySelectorAll("section[id]");

  const handleScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute("id");
      const currentNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (currentNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          currentNavLink.classList.add("active");
        } else {
          currentNavLink.classList.remove("active");
        }
      }
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // 3. Project Filter Tabs
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const categories = card.getAttribute("data-category") || "";
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. Contact Form Submission via FormSubmit.co (Free email delivery)
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("formName");
      const emailInput = document.getElementById("formEmail");
      const messageInput = document.getElementById("formMessage");
      const submitBtn = contactForm.querySelector("button[type='submit']");

      if (!nameInput || !emailInput || !messageInput) return;

      const name = nameInput.value.trim().replace(/[<>]/g, "");
      const email = emailInput.value.trim().replace(/[<>]/g, "");
      const message = messageInput.value.trim().replace(/[<>]/g, "");

      if (!name || !email || !message) {
        alert("Por favor completa todos los campos requeridos.");
        return;
      }

      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Enviando mensaje...";

      // AJAX request to FormSubmit.co
      fetch("https://formsubmit.co/ajax/usquizafranquer@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Nuevo mensaje de ${name} desde el Portafolio`,
          _captcha: "false",
          name: name,
          email: email,
          message: message,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "✓ ¡Mensaje Enviado con Éxito!";
          submitBtn.style.background = "#22c55e";
          submitBtn.style.color = "#0a0a09";

          if (formFeedback) {
            formFeedback.textContent = `¡Muchas gracias, ${name}! Tu mensaje ha sido enviado directamente a mi correo.`;
            formFeedback.style.display = "block";
          }

          contactForm.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = "";
            submitBtn.style.color = "";
            if (formFeedback) {
              formFeedback.style.display = "none";
            }
          }, 5000);
        })
        .catch(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Error al enviar. Intenta de nuevo.";
          submitBtn.style.background = "#ef4444";
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = "";
          }, 3000);
        });
    });
  }

  // 5. Update Year in Footer
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
