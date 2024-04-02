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
  
  // Get a reference to the Firestore service
  const db = firebase.firestore();
  const auth = firebase.auth();
  
  // Function to handle form submission
  document.querySelector('.submit-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
  
    // Get form values
    const name = document.getElementById('name').value;
    const classValue = document.getElementById('class').value;
    const roll = document.getElementById('roll').value;
    const section = document.getElementById('section').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    if (!name || !roll || !section || !phone || !email || !password) {
      // Optionally, you can show an error message or provide feedback to the user
      alert('Please fill in all required fields.');
    } else {
      // Create user with email and password
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          user.displayName = name;
          // Add a new document with a generated ID to the "registrations" collection
          db.collection("intra").doc(user.uid).set({
            name: name,
            class: classValue,
            roll: roll,
            section: section,
            phone: phone,
            email: email
          })
          .then(function() {
            console.log("Document successfully written!");
            
            // Redirect user to profile.html after successful registration
            window.location.href = "profile.html";
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // Handle errors here
          alert(errorMessage);
        });
    }
  });
  