let searchInput = document.querySelector("#search");
let submit = document.querySelector("#submit");
let list = document.querySelector("#list");
const searchIcon = document.querySelector("#searchIcon");
const inputField = document.querySelector("#inputField");

let entries = []

// GET all entries
async function getAll() {
  try {
    let response = await fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/all"
    );
    let data = await response.json();
    console.log(data);

    // Render and sort the list
    list.innerHTML = "";
    entries = [...data.data].sort((a, b) => a.id - b.id);

    render(entries)

    // Gets specific entry: console.log(data.data[1])
  } catch (error) {
    console.error("Error: ", error);
  }
}

function render(entries) {
      // Create container for each entry
    entries.forEach((entry) => {
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

// Search
entries = document.querySelector(".entry");

searchIcon.addEventListener("click", () => {
  searchIcon.style.display = "none";
  inputField.style.display = "block";
});

inputField.addEventListener("input", (e) => {
  console.log(String(e));
});

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

/* IF homepage field is required(search specific entry)
submit.addEventListener("click", (e) => {
  e.preventDefault();
  getItem();
});
*/
