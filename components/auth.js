const template = `
<div x-data="authApp()">
  <template x-if="!$store.app.loggedIn">
    <a class="button is-secondary mr" @click="login()" id="signIn">
      Sign In
    </a>
  </template>
  <template x-if="$store.app.loggedIn">
    <a class="button is-secondary mr" @click="logout()">
      Sign Out
    </a>
  </template>
</div>
`

export default () => {
  return {
    template: template,
    init() {
      console.log('auth component loaded');

      var myapp = this;
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          //console.log(user);
          user.getIdToken().then(function(idToken) {
            //console.log(idToken); // It shows the Firebase token now
            console.log('Signed in');
            myapp.$store.app.loggedIn = true;

            myapp.getData();

          });

        } else {
          console.log('User not signed in');
        }
      });


    },
    login() {

      var myapp = this;
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;

          // The signed-in user info.
          var user = result.user;
          console.log('Signed in');

          myapp.$store.app.loggedIn = true;

          myapp.getData();

        }).catch((error) => {
          console.log(error);
        });

    },
    logout() {

      var myapp = this;
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log('Signed out');
        myapp.$store.app.loggedIn = false;
      }).catch((error) => {
        console.log(error);
      });

    },
    getData() {
      var myapp = this;
      call_api('github/get-data', 'data.json').then(function(res) {
        if (res.ok) {
          console.log(res.msg);
          myapp.$store.items = JSON.parse(res.msg);
          return true;
        } else {
          console.log('An error occured' + res);
          return false;
        }
      });
    }
  }
}