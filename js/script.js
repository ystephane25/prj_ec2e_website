document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM entièrement chargé');

  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Toggle menu mobile
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      console.log('📱 Menu mobile togglé');
    });
  }

  // Activer le lien actuel
  const links = document.querySelectorAll('#main-nav a, #mobile-menu a');
  const currentPath = window.location.pathname.split("/").pop();

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (href === 'index.html' && currentPath === '')) {
      link.classList.add('active');
      console.log(`🔗 Lien actif : ${href}`);
    }

    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    });
  });
});

fetch('header.html')
    .then(res => res.text())
    .then(html => {
    document.getElementById('header-container').innerHTML = html;

    setTimeout(() => {
        let currentPage = window.location.pathname.split('/').pop().toLowerCase();
        if (currentPage === '') currentPage = 'index.html';

        const navLinks = document.querySelectorAll('#main-nav a');

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
        });
    }, 50);
    })
    .catch(console.error);

fetch('footer.html')
    .then(response => response.text())
    .then(data => {
    document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Erreur de chargement du footer:', error));