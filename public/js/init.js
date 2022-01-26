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

/*
function setData(service, path, type, content) {
  let opts = {};
  opts.path = path;
  opts.type = type;
  opts.content = content;
  call_api(service + '/set-data', opts).then(function(res) {
    if (res.ok) {
      console.log(res.msg);
    } else {
      console.log('An error occured' + res);
    }
  });
}

function getData(service, path) {
  let opts = {};
  opts.path = path;
  call_api(service + '/get-data', opts).then(function(res) {
    if (res.ok) {
      console.log(res.msg);
    } else {
      console.log('An error occured: ' + res);
    }
  });
}
*/

async function call_api(route, path, type = '', content = '') {

  var mydata = {};
  mydata.path = path;
  if (type !== '') {
    mydata.type = type;
  }
  if (type !== '') {
    mydata.content = content;
  }

  try {
    const idToken = await firebase.auth().currentUser.getIdToken(true);

    var settings = {
      method: 'post',
      body: JSON.stringify(mydata),
      headers: {
        'Authorization': idToken,
        'Content-Type': 'application/json'
      }
    };
    try {
      const fetchResponse = await fetch('/api/' + route, settings);
      const result = await fetchResponse.json();
      return result;
    } catch (e) {
      return e;
    }

  } catch (e) {
    console.log("Not signed in");
    return "User is not signed in.";
  }

}