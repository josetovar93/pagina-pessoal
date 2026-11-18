document.addEventListener('DOMContentLoaded', () => {
  // 1. Efeito de digitação automática (Typewriter) na caixa de Boas-Vindas
  const typewriterElement = document.getElementById('welcome-typewriter');
  const terminalStatus = document.getElementById('terminal-status');

  if (typewriterElement) {
    const fullText = typewriterElement.getAttribute('data-text') || '';
    let charIndex = 0;

    function typeNextCharacter() {
      if (charIndex < fullText.length) {
        typewriterElement.textContent += fullText.charAt(charIndex);
        charIndex++;

        // Pausa um pouco maior após pontos ou exclamações para simular digitação natural
        const currentChar = fullText.charAt(charIndex - 1);
        let delay = 28;
        if (currentChar === '.' || currentChar === '!') {
          delay = 280;
        } else if (currentChar === ',') {
          delay = 140;
        }

        setTimeout(typeNextCharacter, delay);
      } else if (terminalStatus) {
        terminalStatus.textContent = 'READY';
      }
    }

    // Inicia a digitação após 400ms do carregamento da página
    setTimeout(typeNextCharacter, 400);
  }

  // 2. Rolagem suave para links internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // 3. Destaque automático no menu de navegação conforme a seção visível
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 160;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();
});