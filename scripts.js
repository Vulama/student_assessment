
function refreshing(){
    var x = document.getElementById("btn").value;
    if(x=="init"){
        var s=setInterval(refresh, 60000);
        document.getElementById("btn").value="false";
        x=document.getElementById("btn").value;
    }

    if(x=="false"){
        document.getElementById("btn").innerText="Live";
        document.getElementById("btn").value="true";
    }else{
        document.getElementById("btn").innerText="Static";
        document.getElementById("btn").value="false";
        clearInterval(s);
    }
}

var state=false;

function toggle(){
    var x = document.getElementById("toggle").value;
    if(x=="false"){
        document.getElementById("toggle").innerText="X to HRK";
        document.getElementById("toggle").value="true";
        state=true;
    }else{
        document.getElementById("toggle").innerText="HRK to X";
        document.getElementById("toggle").value="false";
        state=false;
    }
    onChange();

}

var globaldata;


function updateData(data) {
    globaldata=data;
    for(var i=0;i<14;i++){
        var temp=i*5;
        document.getElementById(temp++).innerText=data[i]["Valuta"];
        document.getElementById(temp++).innerText=data[i]["Kupovni za devize"];
        document.getElementById(temp++).innerText=data[i]["Srednji za devize"];
        document.getElementById(temp++).innerText=data[i]["Prodajni za devize"];
        var pri=parseFloat(data[i]["Srednji za devize"].replace(',','.'));
        document.getElementById(temp++).innerText=1/pri;
    }
}

function refresh(arg=false) {
    if(document.getElementById("btn").value=="true" || arg){
        fetch('http://api.hnb.hr/tecajn/v1')
        .then(res => res.json())
        .then(res => updateData(res));
    }
}

async function getData() {
    globaldata=await (await fetch('http://api.hnb.hr/tecajn/v1')).json();
}

var tValue=-1;

function selectValute(v){
    tValue=v;
    document.getElementById("drbtn").innerText=globaldata[v]["Valuta"] + "▼";
}
 
function onChange(){
    if(tValue==-1){
        document.getElementById("resId").innerText="Valute not chosen";
    }else{
        var amount = document.getElementById("no").value;
        if(state){
            //prodajni
            var tempValue=globaldata[tValue]["Prodajni za devize"].replace(',','.');
            document.getElementById("resId").innerText=parseFloat(amount)*parseFloat(tempValue);
            console.log("x to hrk");
        }else{
            //kupvni
            var tempValue=globaldata[tValue]["Kupovni za devize"].replace(',','.');
            document.getElementById("resId").innerText=parseFloat(amount)/parseFloat(tempValue);
            console.log("hrk to x");
        }
    }   
}

function createElementsTable(){
    var html='';
    for(var i=0;i<globaldata.length;i++){
        var x=i*5;
        html +='<div class="grid-item" id="'+ x++ + '"><p></p></div>';
        html +='<div class="grid-item" id="'+ x++ + '"><p></p></div>';
        html +='<div class="grid-item" id="'+ x++ + '"><p></p></div>';
        html +='<div class="grid-item" id="'+ x++ + '"><p></p></div>';
        html +='<div class="grid-item" id="'+ x++ + '"><p></p></div>';
    }
    return html;
}
function createElementsDrop(){
    var drop='';
    for(var i=0;i<globaldata.length;i++){
        drop +='<a onclick="selectValute(' + i + ')">'+globaldata[i]["Valuta"] +'</a>';
    }
    return drop;
}

async function run(){
    hide(document.getElementById("userPage")); 
    await getData();
    var html=createElementsTable();
    var drop=createElementsDrop();
    document.getElementById("table").innerHTML+=html;
    document.getElementById("drop-cont").innerHTML=drop;
    refresh(true);

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

    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;

    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    
    if(data.state=="true"){
        document.getElementById("lilo").innerText="Logout";
        document.getElementById("lilo").value="logout";
        hide(document.getElementById("loginForm"));
        show(document.getElementById("userPage"));
          
    }else{
        console.log("false");
    }
}

var email;
var pass;

function login(){
    email=document.getElementById("email").value;
    pass=document.getElementById("pass").value;
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function(result){
        document.getElementById("lilo").innerText="Logout";
        document.getElementById("lilo").value="logout";
        hide(document.getElementById("loginForm"));
        show(document.getElementById("userPage"));
    }).catch(function(error) {
        document.getElementById("warning").innerText=error.message;
    });
   
}

function lilo(){
    if(document.getElementById("lilo").value=="login"){
        window.location.href='#email';
    }else{
        document.getElementById("lilo").value="login";
        document.getElementById("lilo").innerText="Login";
        hide(document.getElementById("userPage"));
        show(document.getElementById("loginForm"));
    }
}

function hide (elements) {
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
      elements[index].style.display = 'none';
    }
  }

function show (elements) {
    elements = elements.length ? elements : [elements];
    for (var index = 0; index < elements.length; index++) {
      elements[index].style.display = 'inline';
    }
}

function toUserPage(){
    url = 'profile.html';
    document.location.href = url;
}

function ValidateEmail(){
    var inputText=document.getElementById("email");
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.value.match(mailformat)){
        return true;
    }else{
        alert("You have entered an invalid email address!");
        return false;
    }
}

window.onload=run;




