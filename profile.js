var firebaseConfig = {
  apiKey: "AIzaSyCQt_FoOFThE-tBcSjdQsax4LF2fdINdGs",
  authDomain: "jmc-db.firebaseapp.com",
  projectId: "jmc-db",
  storageBucket: "jmc-db.appspot.com",
  messagingSenderId: "970268771226",
  appId: "1:970268771226:web:494babd356a7452284b023",
  measurementId: "G-B7FV63SW95"

};

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      // Initialize Firestore
      var db = firebase.firestore();

// Check if user is authenticated
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  loadEventData(user.uid);
}
});

// Function to load user's event attendance status from Firestore and update checkboxes
function loadEventData(userId) {
db.collection("intra").doc(userId).collection("events").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const eventId = doc.id;
    const attended = doc.data().attended;
    document.getElementById(eventId).checked = attended;
  });
}).catch((error) => {
  console.error("Error loading event data: ", error);
});
}

// Function to handle submit button click
document.getElementById("submit-btn").addEventListener("click", function() {
const user = firebase.auth().currentUser;
if (user) {
  document.getElementById("submit-btn").innerHTML = "Submitting...";    
  // Iterate through checkboxes, update Firestore with user's event attendance status
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    const eventId = checkbox.id;
    const attended = checkbox.checked;
    db.collection("intra").doc(user.uid).collection("events").doc(eventId).set({ attended: attended })
    .then(() => {
      console.log("Event attendance status updated successfully");
    })
    .catch((error) => {
      console.error("Error updating event attendance status: ", error);
    });
  });
  setTimeout(() => {
      location.reload();
    }, 2000);
} else {
  // User is signed out
  // Redirect or show login page
}
});

// Get reference to the signout button
const signoutButton = document.getElementById("signout-btn");

// Add event listener to signout button
signoutButton.addEventListener("click", function() {
firebase.auth().signOut().then(function() {
  // Sign-out successful.
  console.log("User signed out successfully");
  window.location.href = "jmm.html";
}).catch(function(error) {
  // An error happened.
  console.error("Error signing out: ", error);
});
});

// Check for authentication state changes
firebase.auth().onAuthStateChanged(function(user) {
if (user) {
  // User is signed in
  console.log("User is signed in");
  // You can perform actions like redirecting to another page or updating UI elements here
} else {
  // User is signed out
  window.location.href = "jmm.html";
  // You can perform actions like showing login UI or redirecting to login page here
}
});



function hideEvents(){
  firebase.auth().onAuthStateChanged(function(user) {

  db.collection("intra").doc(user.uid).get().then(function(doc) {
    if (doc.exists) {

 let classInt = doc.data().class
//1:PP
//2:CB
//3:LD
//4:CB
//5:ER
//6:MO
//7:IQ
//8:5
//9:SK
//10:HC
//11:CLB
if(classInt >= 9){
  console.log("S, hsec")
  document.getElementById("HC").style.display = "none"

}
if(classInt >= 3 && classInt<=5){
  console.log("Junior")
  document.getElementById("5").style.display = "none"
  document.getElementById("PP").style.display = "none"
  document.getElementById("LD").style.display = "none"
  document.getElementById("CB").style.display = "none"
  document.getElementById("CLB").style.display = "none"

}
if(classInt >= 6 && classInt<=7){
  console.log("Primary")
  document.getElementById("5").style.display = "none"
  document.getElementById("PP").style.display = "none"
  document.getElementById("LD").style.display = "none"
  document.getElementById("CB").style.display = "none"
  document.getElementById("CLB").style.display = "none"

}
  }

})
  })
}
hideEvents();