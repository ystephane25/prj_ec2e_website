// ===== Chargement dynamique du header =====
fetch('header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;

    // Sélecteurs du menu
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.add('animate-slide-down'); // Optionnel si tu as défini l’anim
      });
    }

    // Mise en surbrillance du lien actif
    const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const navLinks = document.querySelectorAll('#main-nav a, #mobile-menu a');

    navLinks.forEach(link => {
      let href = link.getAttribute('href').toLowerCase();
      if (!href.endsWith('.html')) {
        href = href === 'index' ? 'index.html' : href + '.html';
      }

      if (href === currentPage) {
        link.classList.add('text-orange-400', 'font-bold', 'underline'); // Couleur accent
      } else {
        link.classList.remove('text-orange-400', 'font-bold', 'underline');
      }

      // Fermer le menu mobile après clic
      link.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      });
    });
  })
  .catch(console.error);

// ===== Chargement dynamique du footer =====
fetch('footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer-container').innerHTML = html;
  })
  .catch(error => console.error('Erreur de chargement du footer:', error));



// ===== Envoi de mail via EmailJS =====
emailjs.init("5goRErSOYdrifpbTK");

// envoie de mail pour contact
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("contactMessage");
  const submitBtn = document.getElementById("contactSubmit");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Met à jour le bouton pendant l’envoi
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "⏳ Envoi...";
    submitBtn.classList.add("bg-blue-400");

    messageBox.textContent = "⏳ Envoi en cours...";
    messageBox.className = "text-blue-600 mt-4 animate-pulse";

    emailjs.sendForm("service_kpu8jyp", "template_contact", form)
      .then(() => {
        messageBox.textContent = "✅ Message envoyé avec succès !";
        messageBox.className = "text-green-600 mt-4 font-semibold";
        form.reset();
      })
      .catch((error) => {
        console.error("❌ Erreur EmailJS :", error);
        messageBox.textContent = "❌ Une erreur est survenue. Veuillez réessayer.";
        messageBox.className = "text-red-600 mt-4 font-semibold";
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.classList.remove("bg-blue-400");
      });
  });
});


// envoie de devis

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("devisForm");
  const messageBox = document.getElementById("devisMessage");
  const submitButton = form.querySelector("button[type='submit']");

  if (!form || !messageBox || !submitButton) {
    console.error("❌ Formulaire, messageBox ou bouton introuvable !");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // ✅ Important : empêcher le rechargement

    // Texte et style du bouton pendant l'envoi
    submitButton.disabled = true;
    const originalText = submitButton.textContent;
    submitButton.textContent = "⏳ Envoi...";

    messageBox.textContent = "⏳ Envoi en cours...";
    messageBox.className = "text-blue-600 mt-4";

    // Envoi via EmailJS
    emailjs.sendForm("service_kpu8jyp", "template_devis", form)
      .then(() => {
        console.log("✅ Devis envoyé avec succès !");
        messageBox.textContent = "✅ Votre demande de devis a été envoyée avec succès !";
        messageBox.className = "text-green-600 mt-4";
        form.reset(); // ✅ Vide les champs
      })
      .catch((error) => {
        console.error("❌ Erreur EmailJS :", error);
        messageBox.textContent = "❌ Une erreur est survenue. Veuillez réessayer.";
        messageBox.className = "text-red-600 mt-4";
      })
      .finally(() => {
        // Remet le bouton à son état initial
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      });
  });
});
