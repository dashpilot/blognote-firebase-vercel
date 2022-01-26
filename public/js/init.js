var firebaseConfig = {
  apiKey: "AIzaSyBfcGrhulsRnw5TjV_HQ2gwiohOxMAXs4g",
  authDomain: "blognote-5c8dc.firebaseapp.com",
  projectId: "blognote-5c8dc"
};
firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

document.addEventListener('alpine:init', () => {
  Alpine.store('user', {
    loggedIn: false,
  })
})