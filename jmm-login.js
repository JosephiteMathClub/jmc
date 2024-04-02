// Initialize Firebase
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
  
  // Get a reference to the submit button
  const submitBtn = document.getElementById('submit-btn');
  
  // Add event listener to the submit button
  submitBtn.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Get the email and password from the form fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Firebase login logic
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Login successful, redirect to profile.html
        window.location.href = "profile.html";
      })
      .catch((error) => {
        // Login failed, log the error and redirect to jmm.html
        console.error("Error logging in:", error);
        window.location.href = "jmm.html";
      });
  });
  