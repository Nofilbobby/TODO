
  // Import the functions you need from the SDKs you need
 
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBjHf9vl8MI6jm14mbXHay31fuQ7GqOvjk",
    authDomain: "todo-cb673.firebaseapp.com",
    projectId: "todo-cb673",
    databaseURL: "https://todo-cb673-default-rtdb.firebaseio.com",
    storageBucket: "todo-cb673.appspot.com",
    messagingSenderId: "200976854304",
    appId: "1:200976854304:web:9038d183044eaa997bbb45"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);

var list = document.getElementById("taskList");

firebase
  .database()
  .ref("todos")
  .on("child_added", function (data) {
    var liElement = document.createElement("li");

    var liText = document.createTextNode(data.val().todoVal);

    liElement.appendChild(liText);

    list.appendChild(liElement);

    var EditBtnELement = document.createElement("button");

    var EditBtnText = document.createTextNode("Edit");

    EditBtnELement.appendChild(EditBtnText);

    var DeleteBtnELement = document.createElement("button");

    var DeleteBtnText = document.createTextNode("Delete");

    DeleteBtnELement.appendChild(DeleteBtnText);

    liElement.appendChild(EditBtnELement);

    liElement.appendChild(DeleteBtnELement);

    EditBtnELement.setAttribute("class", "Editbtn");
    DeleteBtnELement.setAttribute("class","del")

    DeleteBtnELement.setAttribute("onclick", "deleteItem(this)");

    DeleteBtnELement.setAttribute("id", data.val().key);

    EditBtnELement.setAttribute("onclick", "EditItem(this)");
    EditBtnELement.setAttribute("class", "edit");

    EditBtnELement.setAttribute("id", data.val().key);
  });

function addToDo() {
  var input = document.getElementById("todoInput");

  var id = Date.now().toString(25);

  var todoObj = {
    todoVal: taskInput.value,
    key: id,
  };

  firebase
    .database()
    .ref("todos/" + id)
    .set(todoObj);
}

function deleteAll() {
  firebase.database().ref("todos").remove();
  list.innerHTML = "";
}

function deleteItem(e) {
  firebase.database().ref(`todos/${e.id}`).remove();
  e.parentNode.remove();
}

function EditItem(e) {
  var updateValue = prompt(
    "Enter updated value",
    e.parentNode.firstChild.nodeValue
  );

  firebase.database().ref(`todos/${e.id}`).set({
    key: e.id,
    todoVal: updateValue,
  });

  e.parentNode.firstChild.nodeValue = updateValue;
}




// function addToDo(){
//     var todo = document.getElementById("taskInput");

//     if(todo.value){    
//         var liEle = document.createElement('li');
//         liEle.setAttribute("class","li")
//         var liTxt = document.createTextNode(todo.value);
        
//         liEle.appendChild(liTxt);
        
//         var lit = document.getElementById("list");
        
//         lit.appendChild(liEle);
        
//         var editBtnElemt = document.createElement('button');
        
//         var editBtnTxt = document.createTextNode("Edit");

//         editBtnElemt.appendChild(editBtnTxt);
//         editBtnElemt.setAttribute("class",'edit')
//         editBtnElemt.setAttribute("onclick",'editItem(this)')

//         liEle.appendChild(editBtnElemt);

//         var delBtnElemt = document.createElement('button');

//         var delBtnTxt = document.createTextNode("Delete");
        
//         delBtnElemt.appendChild(delBtnTxt);
//         delBtnElemt.setAttribute("class",'del')
//         delBtnElemt.setAttribute("onclick",'deleteItem(this)')
        
//         liEle.appendChild(delBtnElemt);
        
//         todo.value = "";
//     }
//     else{
//         alert("Please Enter Task!")
//     }
// }

// function deleteAll(){
//     var lit = document.getElementById("list");
//     lit.innerHTML =" ";
// }

// function deleteItem(e){
//     alert("You sure want to delete this!")
//     e.parentNode.remove();
// }
// function editItem(f){
//     var val = f.parentNode.firstChild;
//     var editValue = prompt("Enter Edit Value");

//     val.nodeValue = editValue;
// }






