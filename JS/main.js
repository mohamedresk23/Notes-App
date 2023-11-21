let addBox = document.querySelector(".add-box");
let popupBox = document.querySelector(".popup-box");
let removeIcon = document.querySelector("header i");
let titleTag = document.querySelector("input");
let descTage = document.querySelector("textarea");
let addBtn = document.querySelector("button");
let months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

let mood = "newNote", updateId;

// getting localStorage notes if exist and parsingthrem
// to js object else passing an empty array to notes 
let notes = JSON.parse(localStorage.getItem("notes") || "[]");

// to show popup
addBox.addEventListener("click", (eo) => {
  titleTag.focus();
  popupBox.classList.add("show");
  if (mood == "newNote") {
    noteP.innerText = "Add a new Note";
    addBtn.innerText = "Add new Note";
  }
});
// to hide popup
removeIcon.addEventListener("click", (eo) => {
  titleTag.value = "";
  descTage.value = "";
  mood = "newNote";
  popupBox.classList.remove("show");
});

function showNote() {
  document.querySelectorAll(".note").forEach(note => note.remove());
  notes.forEach((note, index) => {
    let divTag = `<div class="note">
    <div class="details">
      <p>${ note.title }</p>
      <span>${ note.description }</span>
    </div>
    <section class="bottom-content">
      <span>${ note.date }</span>
      <section class="settings">
        <i onclick="showMenu(this)" class="fa-solid fa-ellipsis"></i>
        <ul class="menu">
          <li onclick="updateNote(${ index },'${ note.title }','${ note.description }')"><i class="fa-solid fa-pen"></i>Edit</li>
          <li onclick="deleteNote(${ index })"><i class="fa-solid fa-trash"></i>Delete</li>
        </ul>
      </section>
    </section>
  </div>`;
    addBox.insertAdjacentHTML("afterend", divTag);
  });
}

showNote();

function showMenu(ele) {
  ele.parentElement.classList.add("show");
  document.addEventListener("click", (eo) => {
    if (eo.target.tagName != "I" || eo.target != ele) {
      ele.parentElement.classList.remove("show");
    }
  });
}

// delete note func
function deleteNote(noteId) {
  let confermDelete = confirm("Are you shor to DELETE this Note?");
  if (!confermDelete) return;
  // remove selected note from array
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNote();
}

// update note func
function updateNote(noteId, title, description) {
  addBox.click();
  mood = "updateNote";
  if (mood == "updateNote") {
    updateId = noteId;
    titleTag.value = title;
    descTage.value = description;
    noteP.innerHTML = "Update a Note";
    addBtn.innerText = "Update Note";
  }
  console.log(noteId, title, description);
}

addBtn.addEventListener("click", (eo) => {
  let noteTitle = titleTag.value, noteDesc = descTage.value;
  if (noteTitle || noteDesc) {
    // getting month , day , year from the current date
    let dateObj = new Date();
    let month = months[ dateObj.getMonth() ],
      day = dateObj.getDate(),
      year = dateObj.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: noteDesc,
      date: `${ month } ${ day }, ${ year }`,
    };

    if (mood == "newNote") {
      notes.push(noteInfo);
    }
    else {
      notes[ updateId ] = noteInfo;
    }
    localStorage.setItem("notes", JSON.stringify(notes));
  }
  showNote();
  removeIcon.click();
});