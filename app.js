// Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyClGDmPpHT9_cJyu0p5BW3_GZZY5R521Wg",
    authDomain: "testing-form-847b6.firebaseapp.com",
    projectId: "testing-form-847b6",
    storageBucket: "testing-form-847b6.appspot.com",
    messagingSenderId: "1027661447603",
    appId: "1:1027661447603:web:4a4b585010456ad5810bc6"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Reference contactInfo collection
let contactInfo = firebase.database().ref("infos");

// listen for a submit

document.querySelector(".contact-form").addEventListener("submit",submitForm);

function submitForm(e){
  e.preventDefault();


//   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;


 saveContactInfo(name,email,message);

 document.querySelector(".contact-form").reset()
sendEmail(name, email, message);
  }

  // Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

newContactInfo.set({
name: name,
email: email,
message: message,

});
retrieveInfos();
}


// Retrive Infos
function retrieveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);

}

function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++){
    let infoData = keys[i];
    let name = info[infoData].name;
    let email = info[infoData].email;
    let message = info[infoData].message;
    console.log(name, email, message);
  }
}


retrieveInfos();


//Send Email Info

function sendEmail(name, email, message) {
  Email.send({
    Host:"smtp.gmail.com",
    Username:"prasadnads@gmail.com",
    Password:"ruckjnzcoiaucndh",
    To:"nands5620@gmail.com",
    From:"prasadnads@gmail.com",
    Subject:`${name} send you a message`,
    Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`,
  }).then((message) => alert("mail sent successfully"))
}
