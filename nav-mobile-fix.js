/* UniSocials mobile navigation safety handler.
   Runs independently of the main animation bundle so the mobile menu still works
   if another frontend script throws an error. */
(function () {
  function initMobileNav() {
    var menu = document.getElementById('mobileMenu');
    var oldButton = document.getElementById('hamburger');
    if (!menu || !oldButton) return;

    // Replace the button so any broken/duplicate listeners from other bundles are removed.
    var button = oldButton.cloneNode(true);
    oldButton.parentNode.replaceChild(button, oldButton);

    function setOpen(open) {
      menu.classList.toggle('open', open);
      button.classList.toggle('open', open);
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    }

    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!menu.classList.contains('open'));
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });

    // If a page is restored from browser history, never leave it visually locked.
    window.addEventListener('pageshow', function () {
      setOpen(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav, { once: true });
  } else {
    initMobileNav();
  }
})();
