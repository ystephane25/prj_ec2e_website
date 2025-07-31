// Chargement dynamique du header
fetch('header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-container').innerHTML = html;

    // Maintenant que le DOM contient le header, on peut ajouter les événements
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.add('animate-slide-down');
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
        link.classList.add('text-blue-900', 'font-bold', 'underline');
      } else {
        link.classList.remove('text-blue-900', 'font-bold', 'underline');
      }

      // Fermer le menu mobile après clic
      link.addEventListener('click', () => {
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
      });
    });
  })
  .catch(console.error);

// Chargement dynamique du footer
fetch('footer.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('footer-container').innerHTML = html;
  })
  .catch(error => console.error('Erreur de chargement du footer:', error));


    // ENvoie de mail
// Initialiser EmailJS
emailjs.init("ZimSYHbi-N9o_0v3V");

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const messageBox = document.getElementById("formMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_kpu8jyp", "template_359opys", this)
      .then(() => {
        console.log("✅ Email envoyé");
        messageBox.textContent = "✅ Message envoyé avec succès !";
        messageBox.className = "text-green-600 mt-4";
        form.reset();
      })
      .catch((error) => {
        console.error("❌ Erreur EmailJS :", error);
        messageBox.textContent = "❌ Une erreur est survenue. Veuillez réessayer.";
        messageBox.className = "text-red-600 mt-4";
      });
  });
});