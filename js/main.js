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
      const sectionTop = section.offsetTop - 100;
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

  // 3. Contact Form Submission & Sanitization
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

      // Basic client-side sanitization
      const name = nameInput.value.trim().replace(/[<>]/g, "");
      const email = emailInput.value.trim().replace(/[<>]/g, "");
      const message = messageInput.value.trim().replace(/[<>]/g, "");

      if (!name || !email || !message) {
        alert("Por favor completa todos los campos requeridos.");
        return;
      }

      // UX Feedback
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "Enviando...";

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = "✓ ¡Mensaje Enviado!";
        submitBtn.style.background = "#22c55e";
        submitBtn.style.color = "#0a0a09";

        if (formFeedback) {
          formFeedback.textContent = `¡Gracias, ${name}! Tu mensaje ha sido recibido con éxito.`;
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
        }, 4000);
      }, 800);
    });
  }

  // 4. Update Year in Footer
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
