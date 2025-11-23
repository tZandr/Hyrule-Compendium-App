const searchInput = document.querySelector("#search");
const submit = document.querySelector("#submit");
const list = document.querySelector("#list");
const app = document.querySelector("#app");
const searchButton = document.querySelector("#searchIcon");
const inputField = document.querySelector("#inputField");
const notesButton = document.querySelector("#notesIcon");
const generalNotes = document.querySelector("#gNotes");
const closeButton = document.querySelector("#closeNotes");
const notesText = document.querySelector("#gNotesText");
const saveNote = document.querySelector("#saveNote");
const clearNote = document.querySelector("#clearNote");
const creaturesButton = document.querySelector("#creatures");

let allEntries = [];

// GET all entries
async function getAll() {
  try {
    let response = await fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/all"
    );
    let data = await response.json();
    console.log(data);

    // Render and sort the list
    allEntries = [...data.data].sort((a, b) => a.id - b.id);

    render(allEntries);

    // Gets specific entry: console.log(data.data[1])
  } catch (error) {
    console.error("Error: ", error);
  }
}

function render(allEntries) {
  // Create container for each entry
  list.innerHTML = "";
  allEntries.forEach((entry) => {
    let container = document.createElement("div");
    container.classList.add("entry");

    let img = document.createElement("img");
    img.src = entry.image;
    img.alt = entry.name;

    // Add ID to image + zeroes to match in-game ID.
    let idOverlay = document.createElement("span");
    idOverlay.classList.add("overlay");
    idOverlay.textContent = String(entry.id).padStart(3, "0");

    // Add to list
    container.appendChild(img);
    container.appendChild(idOverlay);
    list.appendChild(container);
  });
}

getAll();

// Show input field when clicking the icon
searchButton.addEventListener("click", () => {
  searchButton.style.display = "none";
  inputField.style.display = "block";
  inputField.focus();
});

// Live filters every change in the input field
inputField.addEventListener("input", (e) => {
  const search = e.target.value.toLowerCase();
  const filtered = allEntries.filter((entry) => {
    //Filtering by name
    const filterByName = entry.name.toLowerCase().includes(search);
    //Filtering by ID
    const filterByID = String(entry.id).padStart(3, "0").includes(search);
    return filterByName || filterByID;
  });
  render(filtered);
});

// General notes(topleft button) pop-up
notesButton.addEventListener("click", () => {
  generalNotes.classList.toggle("active");
});
// Close button
closeButton.addEventListener("click", () => {
  generalNotes.classList.toggle("active");
});

// POST-request for notes when clicking "Save"
saveNote.addEventListener("click", async (e) => {
  e.preventDefault();

  let response = await fetch("https://dummyjson.com/posts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: "User Notes",
      body: notesText.value,
      userId: 1,
    }),
  });
  let notesData = await response.json();
  console.log(notesData);

  // Web storage stuff
});

// DELETE-request for notes when clicking "Clear"
clearNote.addEventListener("click", async (e) => {
  e.preventDefault();
  notesText.value = "";

  let response = await fetch("https://dummyjson.com/posts/251", {
    method: "DELETE",
  });
  let notesData = await response.json();
  console.log(notesData);

  // Clear web storage stuff
});

// Sorting: Creatures(Button 1)
let isFiltered = false;
creaturesButton.addEventListener("click", () => {
  render(
    isFiltered
      ? allEntries
      : allEntries.filter((e) => e.category === "creatures")
  );
  isFiltered = !isFiltered;
});

/* IF homepage field is required(search specific entry)
// Search function
async function getItem() {
  let search = searchInput.value.toLowerCase();

  try {
    let response = await fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/" + search
    );
    let data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error: ", error);
  }
}


submit.addEventListener("click", (e) => {
  e.preventDefault();
  getItem();
});
*/
