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
//nav
    //about text
var aboutCard = document.querySelector('.about-card');
var readMoreBtn = aboutCard.querySelector('.read-more-btn');
var aboutContent = aboutCard.querySelector('.about-content');

readMoreBtn.addEventListener('click', function () {
    event.preventDefault(); // Prevent default behavior of anchor element
    // Toggle the 'open' class to expand/collapse the content
    var isOpen = aboutCard.classList.toggle('open');
    var isOpen = aboutCard.classList.toggle('open');
    
    var isOpen = aboutCard.classList.toggle('open');   
    
    if (isOpen) {
        // Expand the content
        anime({
            targets: aboutContent,
            height: aboutContent.scrollHeight,
            duration: 800, // Adjust the duration as needed
            easing: 'easeInOutQuad' // Adjust the easing function as needed
        });
    } else {
        // Retract the content
        anime({
            targets: aboutContent,
            height: 80, // Initial height
            duration: 800, // Adjust the duration as needed
            easing: 'easeInOutQuad' // Adjust the easing function as needed
        });
    }
});
  //

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


function validateForm() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const messageInput = document.getElementById("message");

    // Regular expressions for email and phone number validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{11}$/;

    // Validation flags
    let isValid = true;
    let errorMessage = "";

    // Validate name
    if (nameInput.value.trim() === "") {
        isValid = false;
        errorMessage += "Name is required.\n";
    }

    // Validate email
    if (!emailRegex.test(emailInput.value.trim())) {
        isValid = false;
        errorMessage += "Invalid email address.\n";
    }

    // Validate phone number
    if (!phoneRegex.test(phoneInput.value.trim())) {
        isValid = false;
        errorMessage += "Invalid phone number. (11 digits only)\n";
    }

    // Validate message
    if (messageInput.value.trim() === "") {
        isValid = false;
        errorMessage += "Message is required.\n";
    }

    // Display error message if validation fails
    if (!isValid) {
        alert(errorMessage);
    }

    return isValid;
}




function startSpinner() {
    var spinner = document.getElementById('spinner');
    var submitBtn = document.querySelector('.submit-btn');
if(validateForm()){
    // Hide submit button and show spinner
    submitBtn.style.display = 'none';
    spinner.style.display = 'block';

    // Simulate loading process for demonstration
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

    // Initialize variables to keep track of the closest section
    let closestSectionIndex = 0;
    let closestDistance = Math.abs(window.scrollY - sections[0].offsetTop);

    // Find the closest section to the top of the viewport
    sections.forEach((section, index) => {
        const distance = Math.abs(window.scrollY - section.offsetTop);
        if (distance < closestDistance) {
            closestSectionIndex = index;
            closestDistance = distance;
        }
    });

    // Remove active class from all nav links
    navLinks.forEach((navLink) => navLink.classList.remove('active'));

    // Add active class to the corresponding nav link for the closest section
    navLinks[closestSectionIndex].classList.add('active');
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

const textElement = document.querySelector('.calculating-text');
const text = "Calculating.  dt";
let index = 0;

function typeWriter() {
    if (index < text.length) {
        textElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Adjust typing speed here
    }
}
typeWriter();

// Anime.js animation to slide the loading screen to the top
// Hide the images initially
document.querySelectorAll('.image-container').forEach(function(imageContainer) {
    imageContainer.style.visibility = 'hidden';
});

//hiding the loading screen
anime({
    targets: '.container',
    opacity: 0,
    duration: 4500, // Adjust duration as needed
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




function footerToggle(footerBtn) {
    $(footerBtn).toggleClass("btnActive");
    $(footerBtn).next().toggleClass("active");
}

//Pop UP function
let popupVisibleOne = false; // Flag to track popup visibility for first popup
let popupVisibleTwo = false; // Flag to track popup visibility for second popup

function openPopupOne() {
    if (!popupVisibleOne && !popupVisibleTwo) { // Check if neither popup is already visible
        const popup = createPopup('JMM Inter', () => {
            popupVisibleOne = false; // Update popup visibility flag for first popup
        });
        document.body.appendChild(popup);
        document.body.classList.add('blurry-background');
        popupVisibleOne = true; // Update popup visibility flag for first popup
    }
}

function openPopupTwo() {
    if (!popupVisibleOne && !popupVisibleTwo) { // Check if neither popup is already visible
        const popup = createPopup('JMF Intra', () => {
            popupVisibleTwo = false; // Update popup visibility flag for second popup
        });
        document.body.appendChild(popup);
        document.body.classList.add('blurry-background');
        popupVisibleTwo = true; // Update popup visibility flag for second popup
    }
}
function createPopup(titleText, onClose) {
    const popup = document.createElement('div');
    popup.classList.add('popup-container');
    const title = document.createElement('h2');
    title.classList.add('popup-title');
    title.innerText = titleText;
    popup.appendChild(title);
    const content = document.createElement('div');
    content.classList.add('popup-content');
    content.innerHTML = `
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec sapien ac justo ullamcorper congue. Nulla facilisi. Vestibulum id dui semper, commodo ex in, eleifend elit. Integer nec arcu vitae eros suscipit finibus. Sed vel leo auctor, pulvinar libero at, gravida mauris. Duis ullamcorper est a tellus dapibus, nec feugiat purus pharetra. In ac aliquam libero, eget congue sem.</p>
        <p>Sed vitae commodo ex. Nam eu enim urna. Sed tempus fringilla tortor, nec lacinia nisl scelerisque eget. Aliquam erat volutpat. Fusce feugiat quam sit amet eleifend condimentum. Vivamus auctor nunc ligula, vel gravida dolor consequat vitae. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi id interdum enim.</p>
        <p>Etiam aliquam mauris ac odio bibendum sodales. Suspendisse et nisi ut elit efficitur tincidunt. Curabitur laoreet, ipsum eget placerat dapibus, urna sapien dapibus nunc, nec gravida dolor neque et justo. Praesent pharetra turpis id leo hendrerit consectetur. Suspendisse quis purus eleifend, venenatis lorem vel, tincidunt turpis. Nulla facilisi.</p>
        <p>Phasellus vehicula, ipsum eget cursus fermentum, mauris erat venenatis quam, id luctus ante est nec tortor. Integer a sodales risus. Ut at turpis felis. Curabitur vel nunc vitae risus iaculis dictum ac et felis. Mauris aliquam nisi vitae nisi convallis, at malesuada dui rutrum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
        <p>Proin sollicitudin lectus et nibh convallis consequat. Morbi consectetur massa eget felis aliquam, non lacinia libero efficitur. Donec nec nisi vel ipsum lacinia aliquet non sit amet tortor. Sed vitae vestibulum turpis. Suspendisse potenti. Sed scelerisque leo vel ex hendrerit fermentum.</p>
    `;
    popup.appendChild(content);

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(popup);
        document.body.classList.remove('blurry-background');
        onClose(); // Call the provided onClose callback function
    });
    popup.appendChild(closeBtn);

    return popup;
}



