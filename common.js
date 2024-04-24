document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".btn");
    const sections = document.querySelectorAll(".section");
  
    buttons.forEach(function(button) {
      button.addEventListener("click", function() {
        const targetSectionClass = button.textContent.toLowerCase();
        const targetSection = document.querySelector("." + targetSectionClass);
        
        buttons.forEach(function(btn) {
          btn.classList.remove("active");
        });
        
        sections.forEach(function(section) {
          section.classList.remove("active");
        });
        
        button.classList.add("active");
        targetSection.classList.add("active");
      });
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
      const burgerMenu = document.querySelector('.burger-menu');
      const navLinks = document.querySelector('.nav-links');
      const navItems = document.querySelectorAll('.nav-links li');
      const navbar = document.querySelector('nav');
  
      burgerMenu.addEventListener('click', function() {
          if (navLinks.classList.contains('nav-active')) {
              anime({
                  targets: '.nav-links',
                  right: '-300px',
                  duration: 700,
                  easing: 'easeInOutQuint',
                  complete: function() {
                      navLinks.classList.remove('nav-active');
                  }
              });
          } else {
              anime({
                  targets: '.nav-links',
                  right: '0',
                  duration: 700,
                  easing: 'easeInOutQuint'
              });
              navLinks.classList.add('nav-active');
          }
      });
  
      // Close navbar menu when clicking outside
      document.addEventListener('click', function(event) {
          if (!navLinks.contains(event.target) && !burgerMenu.contains(event.target)) {
              anime({
                  targets: '.nav-links',
                  right: '-300px',
                  duration: 700,
                  easing: 'easeInOutQuint',
                  complete: function() {
                      navLinks.classList.remove('nav-active');
                  }
              });
          }
      });
  
      // Close navbar menu when clicking on a nav item
      navItems.forEach(item => {
          item.addEventListener('click', function() {
              anime({
                  targets: '.nav-links',
                  right: '-300px',
                  duration: 700,
                  easing: 'easeInOutQuint',
                  complete: function() {
                      navLinks.classList.remove('nav-active');
                  }
              });
          });
      });
  
      let lastScrollTop = 0;
  
      window.addEventListener('scroll', function() {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
          if (scrollTop > lastScrollTop) {
              // Scroll down
              navbar.style.top = `-${navbar.offsetHeight}px`; // Hide navbar by moving it above the viewport
          } else {
              // Scroll up
              navbar.style.top = 0; // Show navbar by moving it back to the top
          }
  
          lastScrollTop = scrollTop;
      });
  });

function footerToggle(footerBtn) {
    $(footerBtn).toggleClass("btnActive");
    $(footerBtn).next().toggleClass("active");
}