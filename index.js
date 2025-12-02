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
const monstersButton = document.querySelector("#monsters");
const equipmentButton = document.querySelector("#equipment");
const materialsButton = document.querySelector("#material");
const treasureButton = document.querySelector("#treasure");

let allEntries = [];

// GET all entries(COMPENDIUM PAGE)
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
  list.innerHTML = "";

  // Create container for each entry
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

    container.addEventListener("click", () => {
      entryDetails(entry);
    });
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
  let savedNotes = JSON.parse(localStorage.getItem("notesData"));
  generalNotes.classList.toggle("active");
  notesText.value = savedNotes.body;
  console.log("Saved and loaded data: ", savedNotes);
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
  localStorage.setItem("notesData", JSON.stringify(notesData));
  console.log("Saved: ", notesData);
});

// DELETE-request for notes when clicking "Clear"
clearNote.addEventListener("click", async (e) => {
  e.preventDefault();
  notesText.value = "";
  localStorage.removeItem("notesData");

  let response = await fetch("https://dummyjson.com/posts/251", {
    method: "DELETE",
  });
  let notesData = await response.json();
  console.log(notesData);
});

// Sorting buttons
let activeFilter = null;

creaturesButton.addEventListener("click", () => {
  if (activeFilter === "creatures") {
    render(allEntries);
    activeFilter = null;
  } else {
    render(allEntries.filter((e) => e.category === "creatures"));
    activeFilter = "creatures";
  }
});

monstersButton.addEventListener("click", () => {
  if (activeFilter === "monsters") {
    render(allEntries);
    activeFilter = null;
  } else {
    render(allEntries.filter((e) => e.category === "monsters"));
    activeFilter = "monsters";
  }
});

equipmentButton.addEventListener("click", () => {
  if (activeFilter === "equipment") {
    render(allEntries);
    activeFilter = null;
  } else {
    render(allEntries.filter((e) => e.category === "equipment"));
    activeFilter = "equipment";
  }
});

materialsButton.addEventListener("click", () => {
  if (activeFilter === "materials") {
    render(allEntries);
    activeFilter = null;
  } else {
    render(allEntries.filter((e) => e.category === "materials"));
    activeFilter = "materials";
  }
});

treasureButton.addEventListener("click", () => {
  if (activeFilter === "treasure") {
    render(allEntries);
    activeFilter = null;
  } else {
    render(allEntries.filter((e) => e.category === "treasure"));
    activeFilter = "treasure";
  }
});

function entryDetails(entry) {
  console.log(`Entry ${entry.id} clicked`);
  let detailsBox = document.querySelector("#details");

  detailsBox.innerHTML = `
  <div id="infoLeft">
    <h2>${entry.name}</h2>
    <p>${entry.description}</p>
    <div>
      <p id="drops">Drops:<br> ${entry.drops}</p>
      <p id="locations">Locations:<br> ${entry.common_locations}</p>
    </div>
  </div>
  <div id="infoRight">
    <img src="${entry.image}">
  </div>
  `;

  let detailsLeft = document.querySelector("#infoLeft");
  let detailsRight = document.querySelector("#infoRight");

  detailsLeft.style.width = "300px";
  detailsRight.style.width = "300px";

  let dropsElement = detailsLeft.querySelector("#drops");
  if (!entry.drops || entry.drops === "null" || entry.drops.length === 0) {
    dropsElement.innerHTML = "Drops: <br> None";
  }

  detailsBox.style.display = "flex";
}
