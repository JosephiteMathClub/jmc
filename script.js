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

function startSpinner() {
    var spinner = document.getElementById('spinner');
    var submitBtn = document.querySelector('.submit-btn');

    // Hide submit button and show spinner
    submitBtn.style.display = 'none';
    spinner.style.display = 'block';

    // Simulate loading process (e.g., API call) for demonstration
    setTimeout(function() {
        // Hide spinner and show submit button again after some delay (e.g., 3 seconds)
        spinner.style.display = 'none';
        submitBtn.style.display = 'inline-block';

        // Show overlay and popup after spinner completes
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }, 3000); // Adjust this time according to your loading process
}

const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const okBtn = document.getElementById('okBtn');

okBtn.addEventListener('click', function() {
  // Hide overlay and popup when okay button is clicked
  overlay.style.display = 'none';
  popup.style.display = 'none';
});

const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0])
  e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);
// Function to update active section in navbar
function updateNavbar() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const height = section.clientHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
            navLinks.forEach((navLink) => navLink.classList.remove('active'));
            navLinks[index].classList.add('active');
        }
    });
}

// Add event listener for scroll event
window.addEventListener('scroll', updateNavbar);
