var data = {};
$("#btnAddOrUpdate").click(function (e) {
    e.preventDefault();

    var formData = $("#formProduct").serializeArray();

    $.each(formData, function (i, v) {
        data["" + v.name + ""] = v.value;
    });
    if (data.status === "1") {
        data.status = true;
    } else data.status = false;
    dataTypes.forEach((element) => {
        if (document.getElementById("typeProduct").value === element.name) {
            data["type"] = element;
        }
    });
    xhr.open("POST", "http://localhost:8080/api/tv/product/save", false);
    xhr.setRequestHeader("content-type", "application/json");
    const ref = firebase.storage().ref();
    const file = document.querySelector("#image").files[0];
    const metadata = {
        contentType: file.type,
    };
    const name = file.name;
    const uploadIMG = ref.child(name).put(file, metadata);
    uploadIMG
        .then((snapshort) => snapshort.ref.getDownloadURL())
        .then((url) => {
            // console.log(url);
            data["image"] = url;
            console.log(data);
        })
        .catch(console.error);
    xhr.send(JSON.stringify(data));
    console.log(JSON.parse(xhr.responseText));
});


let dataTypes;
var xhr = new XMLHttpRequest();

function loadType() {
    xhr.open("GET", "http://localhost:8080/api/tv/types", false);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send();
    dataTypes = JSON.parse(xhr.responseText); //data is now a javascript object full of the API data
    console.log(dataTypes);
}

function render(items) {
    let htmlDiv = document.getElementById("typeProduct");
    let content = items.map(function (item) {
        return `
    <option value="${item.name}">${item.name}</option>
    `;
    });
    htmlDiv.innerHTML = content;
}

loadType();
render(dataTypes);


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmWknugRqujTc1ZfvLjG0a_k1XHTNtX_Y",
    authDomain: "tv-website-8467d.firebaseapp.com",
    projectId: "tv-website-8467d",
    storageBucket: "tv-website-8467d.appspot.com",
    messagingSenderId: "355456936223",
    appId: "1:355456936223:web:ce17894b1b5f318dbba82a",
    measurementId: "G-4P0DL085TD"
};

//  // Initialize Firebase
firebase.initializeApp(firebaseConfig);