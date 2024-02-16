 var firebaseConfig = {
      apiKey: "AIzaSyCQt_FoOFThE-tBcSjdQsax4LF2fdINdGs",
  authDomain: "jmc-db.firebaseapp.com",
  projectId: "jmc-db",
  storageBucket: "jmc-db.appspot.com",
  messagingSenderId: "970268771226",
  appId: "1:970268771226:web:494babd356a7452284b023",
  measurementId: "G-B7FV63SW95"

    };

    firebase.initializeApp(firebaseConfig);
    var db = firebase.firestore();




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
   sendMessage().then(function(){

 setTimeout(function() {
        // Hide spinner and show submit button again after some delay (e.g., 3 seconds)
        spinner.style.display = 'none';
        submitBtn.style.display = 'inline-block';

        // Show overlay and popup after spinner completes
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }, 3000); // Adjust this time according to your loading process
   })
}

const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const okBtn = document.getElementById('okBtn');

okBtn.addEventListener('click', function() {
  // Hide overlay and popup when okay button is clicked
  overlay.style.display = 'none';
  popup.style.display = 'none';
});

/**/

// Function to send message
function sendMessage() {
    return new Promise((resolve, reject) => {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const messageInput = document.getElementById("message");

        // Check if the elements exist
        if (nameInput && emailInput && phoneInput && messageInput) {
            const name = nameInput.value;
            const email = emailInput.value;
            const phone = phoneInput.value;
            const message = messageInput.value;

            // Add a new document with a generated ID to the "messages" collection
            db.collection("messages").add({
                name: name,
                email: email,
                phone: phone,
                message: message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp() // Add timestamp
            })
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                document.getElementById("spinner").style.display = "none";
                // Clear input fields after successful submission
                nameInput.value = "";
                emailInput.value = "";
                phoneInput.value = "";
                messageInput.value = "";
                resolve(); // Resolve the promise when the operation is successful
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
                document.getElementById("spinner").style.display = "none";
                reject(error); // Reject the promise if there's an error
            });
        } else {
            console.error("One or more input elements not found.");
            reject(new Error("One or more input elements not found.")); // Reject the promise if elements not found
        }
    });
}



/**/
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
//touch disable function
function disableTouch() {
    document.querySelector('body').style.pointerEvents = 'auto';
}

// Function to enable touch interactions
function enableTouch() {
    document.querySelector('body').style.pointerEvents = 'none';
}

// Call disableTouch function when the loading screen starts
//disableTouch();

// Call enableTouch function when the loading is complete
//setTimeout(enableTouch, 5000); // Adjust the time according to loading process

const textElement = document.querySelector('.calculating-text');
const text = "Calculating.  dx";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Adjust typing speed here
    }
}

// Call typeWriter function
typeWriter();

// Anime.js animation to slide the loading screen to the top
// Hide the images initially
document.querySelectorAll('.image-container').forEach(function(imageContainer) {
    imageContainer.style.visibility = 'hidden';
});

anime({
    targets: '.container',
    opacity: 0,
    duration: 6000, // Adjust duration as needed
    easing: 'easeInOutQuad', // Adjust easing as needed
    complete: function() {
        document.querySelector('.container').style.display = 'none';
        
        // Make the images visible and animate their transition
        document.querySelectorAll('.image-container').forEach(function(imageContainer) {
            imageContainer.style.visibility = 'visible';

            anime({
                targets: imageContainer,
                translateX: [imageContainer.classList.contains('left') ? '-200px' : '200px', 0], // Slide from left or right
                opacity: [0, 1], // Start from invisible and become visible
                duration: 1100, // Animation duration
                easing: 'easeInOutQuad' // Easing function
            });
        });
    }
});



//article logic
/*
const Artslider = document.querySelector('.art-slider');
const dotsContainer = document.querySelector('.dots-container');
const cards = document.querySelectorAll('.art-card');

let index2 = 0;

function updateSlider() {
    Artslider.style.transform = `translateX(${-index2 * 320}px)`; // Adjust card width plus margin
}

function updateDots() {
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === index2) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            index2 = i;
            updateSlider();
            updateDots();
        });
        dotsContainer.appendChild(dot);
    });
}

updateDots();

// JavaScript for full screen article view
const readMoreBtns = document.querySelectorAll('.read-more-btn');
const articleCards = document.querySelectorAll('.art-card');

readMoreBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.style.display = "none";
        const card = btn.closest('.art-card');
        card.classList.add('full-screen');
        
        // Remove fullscreen attribute from other cards
        articleCards.forEach(article => {
            if (article !== card) {
                article.classList.remove('full-screen');
            }
        });

        // Create and append close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '<i class="fas fa-times"></i>'; // Example close icon, you can replace it with your own icon
        closeButton.classList.add('close-btn');
        card.appendChild(closeButton);

        // Add event listener to close button
        closeButton.addEventListener('click', () => {
            card.classList.remove('full-screen');
            btn.style.display = "block";
            closeButton.remove(); // Remove the close button
        });
    });
});

document.addEventListener('click', event => {
    const isInsideArticle = event.target.closest('.art-card');
    if (!isInsideArticle) {
        articleCards.forEach(card => {
            card.classList.remove('full-screen');
        });
        readMoreBtns.forEach(btn => {
            btn.style.display = "block";
        });
        const closeButtons = document.querySelectorAll('.close-btn');
        closeButtons.forEach(button => button.remove());
    }
});
*/
function footerToggle(footerBtn) {
    $(footerBtn).toggleClass("btnActive");
    $(footerBtn).next().toggleClass("active");
}