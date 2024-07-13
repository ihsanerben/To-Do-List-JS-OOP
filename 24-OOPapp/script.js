let addDOM = document.getElementById("ekleID");
let cleanDOM = document.getElementById("temizleID");
let inputText = document.getElementById("inputID");
let toDos = document.getElementById("ulID");

let toDosArr = [];

addDOM.addEventListener("click", function () {
    let id = toDosArr.length + 1;
    let title = inputText.value;
    let todo = new ToDo(id, title);
    toDosArr.push(todo);
    UI.displayToDos();
    UI.clearInput();
});

cleanDOM.addEventListener("click", function () {
    UI.temizleToDos();
});

class ToDo {
    constructor(id, title) {
        this.id = id;
        this.title = title;
    }
}

class UI {
    static clearInput() {
        inputText.value = "";
    }

    static alert() {
        window.alert("Silindi");
    }

    static alert2() {
        window.alert("Tüm liste temizlendi");
    }

    static deleteToDo(id) {
        let deletedID;

        for (let i = 0; i < toDosArr.length; i++) {
            if (toDosArr[i].id === id) {
                deletedID = i;
            }
        }

        toDosArr.splice(deletedID, 1);
        UI.alert();
        UI.displayToDos();
    }

    static temizleToDos() {
        toDosArr.splice(0, toDosArr.length);
        UI.displayToDos();
        UI.alert2();
    }

    static displayToDos() {
        if (toDosArr.length === 0) {
            toDos.innerHTML = "Liste Boş.";
        } else {
            let result = "";
            for (let i = 0; i < toDosArr.length; i++) {
                result += `
                    <li>
                            <span>${toDosArr[i].title}</span>
                            <button class="button1" onclick="UI.deleteToDo(${toDosArr[i].id})">sil</button>
                        </li>
                    `
            }
            toDos.innerHTML = result;
        }
    }
}

UI.displayToDos();