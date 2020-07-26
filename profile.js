function retHome(){
    url = 'index.html?state=' + encodeURIComponent(true);
    document.location.href = url;
}

function retLogout(){
    url = 'index.html?state=' + encodeURIComponent(false);
    document.location.href = url;
}

window.onload=run;

function run(){
    const firebaseConfig = {
        apiKey: "AIzaSyCjMkfuQe4Fhj1zO1GRKALHQajpaVFPPBM",
        authDomain: "student-assessment-7f486.firebaseapp.com",
        databaseURL: "https://student-assessment-7f486.firebaseio.com",
        projectId: "student-assessment-7f486",
        storageBucket: "student-assessment-7f486.appspot.com",
        messagingSenderId: "850377342800",
        appId: "1:850377342800:web:93ad518bb62d3a444df655",
        measurementId: "G-M0ZNK92VVH"
      };

    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();

    var ref = database.ref('info');
    ref.on('value',gotData,errData);

    /*
    var data ={
        name: "admin",
        lastname: "supreme",
        email: "admin@gmail.com",
        dob: "07.04.2020",
        address: "Somewhere Street, 10000 Zagreb"
        
    }
    ref.push(data);
    */
}

function gotData(data){
    console.log(data.val());
    var info = data.val();
    var keys = Object.keys(info);

    for(var i=0;i<keys.length;i++){
        var k=keys[i];
        var retEmail = info[k].email;
        if(firebase.auth().currentUser.email==retEmail){
            document.getElementById("name").innerText+=info[k].name;
            document.getElementById("lname").innerText+=info[k].lastname;
            document.getElementById("dob").innerText+=info[k].dob;
            document.getElementById("address").innerText+=info[k].address;
            document.getElementById("email").innerText+=info[k].email;
        }
    }
}

function errData(err){
    console.log(err);
}