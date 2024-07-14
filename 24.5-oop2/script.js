let ekleButton = document.getElementById("ekleID");
let temizleButton = document.getElementById("temizleID");
let inputText = document.getElementById("inputID");
let todos = document.getElementById("ulID");
let p128 = document.getElementById("p128");

window.addEventListener("DOMContentLoaded", function () {
  UI.bastir();
});

class Storage {
  static addTodoStorage(xarr) {
    let addStorage = localStorage.setItem("todo", JSON.stringify(xarr));
    return addStorage;
  }

  static getStorage() {
    let getStorage =
      localStorage.getItem("todo") === null
        ? []
        : JSON.parse(localStorage.getItem("todo"));
    return getStorage;
  }
}

let todosARR = Storage.getStorage();

ekleButton.addEventListener("click", (event) => {
  event.preventDefault();

  let id = todosARR.length + 1;
  let title = inputText.value;
  if (title.trim() === "") {
    window.alert("WRITE SOMETHING AQ");
    return;
  }
  let person = new Person(id, title);
  for (let i = 0; i < todosARR.length; i++) {
    if (title === todosARR[i].title) {
      UI.alert3();
      return;
    }
  }
  todosARR = [...todosARR, person];
  UI.bastir();
  UI.cleanInputSide();

  Storage.addTodoStorage(todosARR);
});

temizleButton.addEventListener("click", () => {
  todos.innerHTML = "";
  todosARR.splice(0, todosARR.length);
  UI.alert2();
  Storage.addTodoStorage(todosARR);
  UI.bastir();
});

class UI {
  static alert2() {
    window.alert("ALERT: CLEANED ALL TASKS!");
  }

  static alert3() {
    window.alert("ALERT: THIS TASK IS AVALIABLE!");
  }

  static cleanInputSide() {
    inputText.value = "";
  }

  static miniDeleteButton(id) {
    let silinmesiGerekenID;
    for (let i = 0; i < todosARR.length; i++) {
      if (todosARR[i].id === id) {
        silinmesiGerekenID = i;
      }
    }
    todosARR.splice(silinmesiGerekenID, 1);
    Storage.addTodoStorage(todosARR);
    UI.bastir();
  }

  static bastir() {
    if (todosARR.length == 0) {
      todos.innerHTML = "There is no task!";
    } else {
      let result = "";
      for (let i = 0; i < todosARR.length; i++) {
        result += `<li>
                <span>${todosARR[i].title}</span>
                <button class="button1" onclick = "UI.miniDeleteButton(${todosARR[i].id})">sil</button>
            </li>`;
      }
      todos.innerHTML = result;
    }
    p128.innerHTML = "(" + todosARR.length + ")";
  }
}

class Person {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }
}
