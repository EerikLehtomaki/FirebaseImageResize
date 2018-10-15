// Initialize Firebase
var config =
    {
        apiKey: "AIzaSyAWOunTSLVQcaQuQTY1gyWF8OCB5PPm_iI",
        authDomain: "task-6-f0687.firebaseapp.com",
        databaseURL: "https://task-6-f0687.firebaseio.com",
        storageBucket: "task-6-f0687.appspot.com",
        messagingSenderId: "375733053210"
    };

firebase.initializeApp(config);

var storage = firebase.storage();
var storageRef = storage.ref();


var auth = firebase.auth();

var storage = firebase.storage();
var storageRef = storage.ref();
var tangRef = storageRef.child('images/' + 'test.jpg');

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var file = evt.target.files[0];
    var metadata = {
        'contentType': file.type
    };

    storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
        snapshot.ref.getDownloadURL().then(function(url) {
            document.getElementById('linkbox').innerHTML = '<a href="' +  url + '">Click For File</a>';
            tangRef = storageRef.child('images/resized_' + file.name);
        });
    }).catch(function(error) {
        console.error('Upload failed:', error);
    });

}

function myFunction() {


    firebase.auth().signInAnonymously().then(function() {

        tangRef.getDownloadURL().then(function(url)                             {
            document.querySelector('img').src = url;

        }).catch(function(error) {
            console.error(error);
        });
    });
}

window.onload = function() {
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
    document.getElementById('file').disabled = true;
    auth.onAuthStateChanged(function(user) {
        if (user) {
            console.log('Anonymous user signed-in.', user);
            document.getElementById('file').disabled = false;
        } else {
            console.log('There was no anonymous session. Creating a new anonymous user.');
            // Sign the user in anonymously since accessing Storage requires the user to be authorized.
            auth.signInAnonymously().catch(function(error) {
                if (error.code === 'auth/operation-not-allowed') {
                    window.alert('Anonymous Sign-in failed. Please make sure that you have enabled anonymous ' +
                        'sign-in on your Firebase project.');
                }
            });
        }
    });
}